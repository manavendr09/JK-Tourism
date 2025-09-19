import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:8080" }));

// Health check route
app.get("/", (req, res) => {
  res.send("✅ JharkhandBot backend is running!");
});

// Chat route with OpenAI → Gemini fallback
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // ========== 1. Try OpenAI first ==========
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are JharkhandBot, a helpful travel assistant for Jharkhand tourism.",
              },
              { role: "user", content: message },
            ],
          }),
        });

        const data = await response.json();
        console.log("OpenAI response:", JSON.stringify(data, null, 2));

        // If successful, return OpenAI reply
        if (response.ok && data.choices?.[0]?.message?.content) {
          return res.json({ reply: data.choices[0].message.content });
        }

        // If quota exceeded, rate limited, or error, fall back
        console.warn("⚠️ OpenAI failed, falling back to Gemini:", data.error || response.status);
      } catch (err) {
        console.error("⚠️ OpenAI network error, falling back:", err.message);
      }
    }

    // ========== 2. Fallback to Gemini ==========
    if (!process.env.GEMINI_API_KEY) {
      return res
        .status(500)
        .json({ reply: "⚠️ Both OpenAI and Gemini API keys missing." });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are JharkhandBot, a helpful travel assistant for Jharkhand tourism.\n\n${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    console.log("Gemini response:", JSON.stringify(geminiData, null, 2));

    const reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Sorry, I didn’t understand.";

    return res.json({ reply });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ reply: "⚠️ Something went wrong." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
