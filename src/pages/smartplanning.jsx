import React, { useState, useEffect } from 'react';

const SmartTripPlanner = () => {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [formData, setFormData] = useState({
    places: '',
    budget: '',
    days: '',
    travelDate: '',
    groupSize: '',
    language: 'English'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [tripPlan, setTripPlan] = useState('');

  // Language translations
  const translations = {
    English: {
      tripTitle: "Your Jharkhand Adventure Plan",
      destinations: "Destinations",
      duration: "Duration", 
      budget: "Budget",
      groupSize: "Group Size",
      places: "places",
      days: "days",
      total: "total",
      day: "Day",
      earlyMorning: "Early Morning Departure",
      earlyMorningDesc: "Start your journey to {place}. Have breakfast on the way or pack some snacks.",
      earlyMorningTip: "Start early to avoid traffic and make the most of your day!",
      explore: "Explore {place}",
      exploreDesc: "Visit the main attractions at {place}. {photoTip}",
      explorePhotoTip: "Perfect time for photography with good lighting.",
      exploreTip: "Entry fee: ₹50-200 per person. {shoeTip}",
      trekkingShoes: "Wear comfortable trekking shoes.",
      walkingShoes: "Wear comfortable walking shoes.",
      lunchBreak: "Lunch Break",
      lunchDesc: "Enjoy local cuisine at a recommended restaurant. Try traditional Jharkhand dishes like Litti Chokha.",
      lunchTip: "Budget: ₹200-400 per person for a good meal",
      visit: "Visit {place}",
      extended: "Extended exploration of {place}",
      visitDesc: "Explore {place} and its surroundings.",
      extendedDesc: "Discover hidden gems and lesser-known spots around {place}.",
      wildlifeTip: "Best time for wildlife spotting. Carry binoculars!",
      hydrationTip: "Don't forget to stay hydrated!",
      eveningRelax: "Evening Relaxation",
      eveningDesc: "Find a scenic spot to watch the sunset. Perfect time for group photos and memories.",
      eveningTip: "Golden hour photography - best lighting for pictures!",
      dinnerCulture: "Dinner & Local Culture",
      dinnerCultureDesc: "Experience local tribal culture and traditional performances while having dinner.",
      dinnerDesc: "Enjoy dinner at a local restaurant and interact with locals.",
      dinnerTip: "Budget: ₹300-500 per person for dinner"
    },
    Hindi: {
      tripTitle: "आपका झारखंड साहसिक यात्रा योजना",
      destinations: "गंतव्य",
      duration: "अवधि",
      budget: "बजट", 
      groupSize: "ग्रुप का आकार",
      places: "स्थान",
      days: "दिन",
      total: "कुल",
      day: "दिन",
      earlyMorning: "सुबह जल्दी प्रस्थान",
      earlyMorningDesc: "{place} की यात्रा शुरू करें। रास्ते में नाश्ता करें या कुछ स्नैक्स पैक करें।",
      earlyMorningTip: "ट्रैफिक से बचने और दिन का अधिकतम लाभ उठाने के लिए जल्दी शुरू करें!",
      explore: "{place} का अन्वेषण करें",
      exploreDesc: "{place} के मुख्य आकर्षणों को देखें। {photoTip}",
      explorePhotoTip: "अच्छी रोशनी के साथ फोटोग्राफी के लिए सही समय।",
      exploreTip: "प्रवेश शुल्क: ₹50-200 प्रति व्यक्ति। {shoeTip}",
      trekkingShoes: "आरामदायक ट्रेकिंग जूते पहनें।",
      walkingShoes: "आरामदायक चलने वाले जूते पहनें।",
      lunchBreak: "दोपहर का भोजन",
      lunchDesc: "सुझाए गए रेस्टोरेंट में स्थानीय व्यंजनों का आनंद लें। लिट्टी चोखा जैसे पारंपरिक झारखंड व्यंजन आजमाएं।",
      lunchTip: "बजट: अच्छे भोजन के लिए ₹200-400 प्रति व्यक्ति",
      visit: "{place} का भ्रमण",
      extended: "{place} का विस्तृत अन्वेषण",
      visitDesc: "{place} और इसके आसपास के क्षेत्र का अन्वेषण करें।",
      extendedDesc: "{place} के आसपास छिपे हुए रत्नों और कम ज्ञात स्थानों की खोज करें।",
      wildlifeTip: "वन्यजीव देखने का सबसे अच्छा समय। दूरबीन साथ रखें!",
      hydrationTip: "हाइड्रेटेड रहना न भूलें!",
      eveningRelax: "शाम का आराम",
      eveningDesc: "सूर्यास्त देखने के लिए एक सुंदर स्थान खोजें। ग्रुप फोटो और यादों के लिए सही समय।",
      eveningTip: "गोल्डन आवर फोटोग्राफी - तस्वीरों के लिए सबसे अच्छी रोशनी!",
      dinnerCulture: "रात्रि भोजन और स्थानीय संस्कृति",
      dinnerCultureDesc: "रात्रि भोजन के साथ स्थानीय आदिवासी संस्कृति और पारंपरिक प्रदर्शन का अनुभव करें।",
      dinnerDesc: "स्थानीय रेस्टोरेंट में रात्रि भोजन का आनंद लें और स्थानीय लोगों से मिलें।",
      dinnerTip: "बजट: रात्रि भोजन के लिए ₹300-500 प्रति व्यक्ति"
    },
    Bengali: {
      tripTitle: "আপনার ঝাড়খণ্ড অ্যাডভেঞ্চার পরিকল্পনা",
      destinations: "গন্তব্য",
      duration: "সময়কাল",
      budget: "বাজেট",
      groupSize: "দলের আকার", 
      places: "স্থান",
      days: "দিন",
      total: "মোট",
      day: "দিন",
      earlyMorning: "ভোরে রওনা",
      earlyMorningDesc: "{place} এর যাত্রা শুরু করুন। পথে নাস্তা করুন বা কিছু স্ন্যাকস প্যাক করুন।",
      earlyMorningTip: "ট্রাফিক এড়াতে এবং দিনের সর্বোচ্চ ব্যবহার করতে তাড়াতাড়ি শুরু করুন!",
      explore: "{place} অন্বেষণ করুন",
      exploreDesc: "{place} এর মূল আকর্ষণগুলি দেখুন। {photoTip}",
      explorePhotoTip: "ভাল আলোর সাথে ফটোগ্রাফির জন্য নিখুঁত সময়।",
      exploreTip: "প্রবেশ ফি: প্রতি ব্যক্তি ₹৫০-২০০। {shoeTip}",
      trekkingShoes: "আরামদায়ক ট্রেকিং জুতা পরুন।",
      walkingShoes: "আরামদায়ক হাঁটার জুতা পরুন।",
      lunchBreak: "দুপুরের খাবার বিরতি",
      lunchDesc: "প্রস্তাবিত রেস্তোরাঁয় স্থানীয় খাবারের স্বাদ নিন। লিট্টি চোখার মতো ঐতিহ্যবাহী ঝাড়খণ্ড খাবার চেষ্টা করুন।",
      lunchTip: "বাজেট: ভাল খাবারের জন্য প্রতি ব্যক্তি ₹২০০-৪০০",
      visit: "{place} পরিদর্শন",
      extended: "{place} এর বিস্তৃত অন্বেষণ",
      visitDesc: "{place} এবং এর আশেপাশের এলাকা অন্বেষণ করুন।",
      extendedDesc: "{place} এর আশেপাশে লুকানো রত্ন এবং কম পরিচিত স্থানগুলি আবিষ্কার করুন।",
      wildlifeTip: "বন্যপ্রাণী দেখার সেরা সময়। দূরবীন সাথে রাখুন!",
      hydrationTip: "হাইড্রেটেড থাকতে ভুলবেন না!",
      eveningRelax: "সন্ধ্যার বিশ্রাম",
      eveningDesc: "সূর্যাস্ত দেখার জন্য একটি সুন্দর জায়গা খুঁজুন। দলগত ছবি এবং স্মৃতির জন্য নিখুঁত সময়।",
      eveningTip: "গোল্ডেন আওয়ার ফটোগ্রাফি - ছবির জন্য সেরা আলো!",
      dinnerCulture: "রাতের খাবার এবং স্থানীয় সংস্কৃতি",
      dinnerCultureDesc: "রাতের খাবারের সাথে স্থানীয় উপজাতীয় সংস্কৃতি এবং ঐতিহ্যবাহী পরিবেশনা অনুভব করুন।",
      dinnerDesc: "স্থানীয় রেস্তোরাঁয় রাতের খাবার উপভোগ করুন এবং স্থানীয়দের সাথে মিশুন।",
      dinnerTip: "বাজেট: রাতের খাবারের জন্য প্রতি ব্যক্তি ₹৩০০-৫০০"
    }
  };

  const presetPlaces = [
    "Hundru Falls", "Betla National Park", "Netarhat", "Patratu Valley", 
    "Deoghar", "Ranchi", "Jamshedpur", "Hazaribagh", "Parasnath Hill"
  ];

  const activities = [
    "Trekking", "Wildlife Safari", "Cultural Tours", "Photography", 
    "Adventure Sports", "Temple Visits", "Nature Walks", "Tribal Culture"
  ];

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, travelDate: today }));
  }, []);

  const togglePlace = (place) => {
    const updatedPlaces = selectedPlaces.includes(place)
      ? selectedPlaces.filter(p => p !== place)
      : [...selectedPlaces, place];
    
    setSelectedPlaces(updatedPlaces);
    setFormData(prev => ({ ...prev, places: updatedPlaces.join(', ') }));
  };

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getDayPlaces = (places, day, totalDays) => {
    const placesPerDay = Math.ceil(places.length / totalDays);
    const startIndex = (day - 1) * placesPerDay;
    return places.slice(startIndex, startIndex + placesPerDay);
  };

  const getDayActivities = (activities, day) => {
    if (activities.length === 0) return ['Sightseeing'];
    return activities.slice(0, Math.min(2, activities.length));
  };

  const generateDaySchedule = (places, activities, budget, lang) => {
    return [
      {
        time: "7:00 AM",
        title: lang.earlyMorning,
        description: lang.earlyMorningDesc.replace('{place}', places[0]),
        tips: lang.earlyMorningTip
      },
      {
        time: "10:00 AM",
        title: lang.explore.replace('{place}', places[0]),
        description: lang.exploreDesc.replace('{place}', places[0]).replace('{photoTip}', activities.includes('Photography') ? lang.explorePhotoTip : ''),
        tips: lang.exploreTip.replace('{shoeTip}', activities.includes('Trekking') ? lang.trekkingShoes : lang.walkingShoes)
      },
      {
        time: "1:00 PM",
        title: lang.lunchBreak,
        description: lang.lunchDesc,
        tips: lang.lunchTip
      },
      {
        time: "3:00 PM",
        title: places.length > 1 ? lang.visit.replace('{place}', places[places.length - 1]) : lang.extended.replace('{place}', places[0]),
        description: places.length > 1 ? lang.visitDesc.replace('{place}', places[places.length - 1]) : lang.extendedDesc.replace('{place}', places[0]),
        tips: activities.includes('Wildlife Safari') ? lang.wildlifeTip : lang.hydrationTip
      },
      {
        time: "6:00 PM",
        title: lang.eveningRelax,
        description: lang.eveningDesc,
        tips: lang.eveningTip
      },
      {
        time: "8:00 PM",
        title: lang.dinnerCulture,
        description: activities.includes('Tribal Culture') ? lang.dinnerCultureDesc : lang.dinnerDesc,
        tips: lang.dinnerTip
      }
    ];
  };

  const generateBudgetBreakdown = (totalBudget, days, groupSize, language) => {
    const groupNumber = groupSize === 'Solo Travel' ? 1 : 
                       groupSize === 'Couple' ? 2 : 
                       groupSize === 'Small Group (3-4)' ? 4 :
                       groupSize === 'Medium Group (5-8)' ? 6 : 8;

    const perPersonBudget = Math.floor(totalBudget / groupNumber);
    const accommodation = Math.floor(perPersonBudget * 0.35);
    const food = Math.floor(perPersonBudget * 0.25);
    const transport = Math.floor(perPersonBudget * 0.25);
    const activitiesBudget = Math.floor(perPersonBudget * 0.15);

    const budgetLabels = {
      English: {
        title: "Budget Breakdown (Per Person)",
        accommodation: "Accommodation",
        food: "Food & Meals", 
        transport: "Transportation",
        activities: "Activities",
        of: "of budget"
      },
      Hindi: {
        title: "बजट विवरण (प्रति व्यक्ति)",
        accommodation: "आवास",
        food: "भोजन और खाना",
        transport: "परिवहन", 
        activities: "गतिविधियाँ",
        of: "बजट का"
      },
      Bengali: {
        title: "বাজেট বিভাজন (প্রতি ব্যক্তি)",
        accommodation: "বাসস্থান",
        food: "খাবার ও খাদ্য",
        transport: "পরিবহন",
        activities: "কার্যক্রম", 
        of: "বাজেটের"
      }
    };

    const labels = budgetLabels[language] || budgetLabels.English;

    return (
      <div className="budget-breakdown">
        <h3>💰 {labels.title}</h3>
        <div className="budget-grid">
          <div className="budget-item">
            <h4>🏨 {labels.accommodation}</h4>
            <p>₹{accommodation}</p>
            <small>35% {labels.of}</small>
          </div>
          <div className="budget-item">
            <h4>🍽️ {labels.food}</h4>
            <p>₹{food}</p>
            <small>25% {labels.of}</small>
          </div>
          <div className="budget-item">
            <h4>🚗 {labels.transport}</h4>
            <p>₹{transport}</p>
            <small>25% {labels.of}</small>
          </div>
          <div className="budget-item">
            <h4>🎯 {labels.activities}</h4>
            <p>₹{activitiesBudget}</p>
            <small>15% {labels.of}</small>
          </div>
        </div>
      </div>
    );
  };

  const generateTravelTips = (places, activities) => {
    const tips = [
      "🌡️ Check weather conditions before traveling",
      "📱 Download offline maps for better navigation",
      "💊 Carry basic medicines and first aid kit",
      "🎒 Pack light but include essentials",
      "📸 Carry extra batteries for cameras",
      "💧 Stay hydrated, especially during treks",
      "🏨 Book accommodations in advance during peak season",
      "🚗 Keep emergency contact numbers handy"
    ];

    if (activities.includes('Trekking')) {
      tips.push("🥾 Wear proper trekking shoes and carry energy snacks");
    }
    if (activities.includes('Wildlife Safari')) {
      tips.push("🔇 Maintain silence during wildlife spotting");
    }

    return (
      <div className="travel-tips">
        <h3>💡 Essential Travel Tips</h3>
        <div className="tips-grid">
          {tips.slice(0, 8).map((tip, index) => (
            <div key={index} className="tip-item">
              {tip}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const generateTrip = () => {
    const places = formData.places || selectedPlaces.join(', ');
    const { budget, days, travelDate, groupSize, language } = formData;

    if (!places || !budget || !days || !groupSize) {
      alert('Please fill in all required fields: Places, Budget, Number of Days, and Group Size');
      return;
    }

    setShowResults(true);
    setIsLoading(true);
    
    setTimeout(() => {
      generateTripPlan(places, budget, days, travelDate, groupSize, selectedActivities, language);
      setIsLoading(false);
    }, 3000);
  };

  const generateTripPlan = (places, budget, days, travelDate, groupSize, activities, language) => {
    const placesArray = places.split(',').map(p => p.trim()).filter(p => p);
    const budgetPerDay = Math.floor(budget / days);
    const lang = translations[language] || translations.English;
    
    let tripPlanContent = [];

    // Trip Summary
    tripPlanContent.push(
      <div key="summary" className="trip-summary">
        <h2>{lang.tripTitle}</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <h4>📍 {lang.destinations}</h4>
            <p>{placesArray.length} {lang.places}</p>
          </div>
          <div className="summary-item">
            <h4>📅 {lang.duration}</h4>
            <p>{days} {lang.days}</p>
          </div>
          <div className="summary-item">
            <h4>💰 {lang.budget}</h4>
            <p>₹{budget} {lang.total}</p>
          </div>
          <div className="summary-item">
            <h4>👥 {lang.groupSize}</h4>
            <p>{groupSize}</p>
          </div>
        </div>
      </div>
    );

    // Generate detailed itinerary
    for (let day = 1; day <= days; day++) {
      const dayPlaces = getDayPlaces(placesArray, day, days);
      const dayActivities = getDayActivities(activities, day);
      const daySchedule = generateDaySchedule(dayPlaces, dayActivities, budgetPerDay, lang);
      
      tripPlanContent.push(
        <div key={`day-${day}`} className="day-itinerary">
          <div className="day-header">
            {lang.day} {day} - {dayPlaces.join(' & ')}
          </div>
          {daySchedule.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-time">
                {activity.time}
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <div className="activity-tips">
                  💡 {activity.tips}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Add budget breakdown
    tripPlanContent.push(generateBudgetBreakdown(budget, days, groupSize, language));
    
    // Add travel tips
    tripPlanContent.push(generateTravelTips(placesArray, activities));

    setTripPlan(tripPlanContent);
  };

  return (
    <div className="smart-trip-planner">
      <div className="planner-container">
        {/* Header */}
        <div className="planner-header">
          <div className="header-icon">
            🌟
          </div>
          <div>
            <h1>Smart Trip Planner</h1>
            <p>Let our AI create your perfect Jharkhand adventure</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="form-container">
          {/* Places Section */}
          <div className="form-section">
            <h3>
              📍 Places You'd Like to Visit
            </h3>
            <textarea
              placeholder="Tell us which places in Jharkhand you'd like to explore..."
              value={formData.places}
              onChange={(e) => setFormData(prev => ({ ...prev, places: e.target.value }))}
            />
            <div className="places-grid">
              {presetPlaces.map((place) => (
                <span
                  key={place}
                  className={`place-chip ${selectedPlaces.includes(place) ? 'selected' : ''}`}
                  onClick={() => togglePlace(place)}
                >
                  {place}
                </span>
              ))}
            </div>
          </div>

          {/* Form Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>💰 Budget (in ₹)</label>
              <input
                type="number"
                name="budget"
                placeholder="e.g., 15000"
                min="1000"
                value={formData.budget}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>📅 Number of Days</label>
              <select
                name="days"
                value={formData.days}
                onChange={handleInputChange}
              >
                <option value="">Select duration</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
                <option value="7">1 Week</option>
                <option value="10">10 Days</option>
                <option value="14">2 Weeks</option>
              </select>
            </div>
          </div>

          {/* Form Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>📅 Travel Date</label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label>👥 Group Size</label>
              <select
                name="groupSize"
                value={formData.groupSize}
                onChange={handleInputChange}
              >
                <option value="">How many people?</option>
                <option value="Solo Travel">Solo Travel</option>
                <option value="Couple">Couple</option>
                <option value="Small Group (3-4)">Small Group (3-4)</option>
                <option value="Medium Group (5-8)">Medium Group (5-8)</option>
                <option value="Large Group (8+)">Large Group (8+)</option>
              </select>
            </div>
          </div>

          {/* Activities Section */}
          <div className="form-section">
            <h3>
              🎯 Preferred Activities
            </h3>
            <div className="activities-grid">
              {activities.map((activity) => (
                <div
                  key={activity}
                  className={`activity-chip ${selectedActivities.includes(activity) ? 'selected' : ''}`}
                  onClick={() => toggleActivity(activity)}
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="form-group full-width">
            <label>🗣️ Preferred Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            className="generate-button"
            onClick={generateTrip}
            disabled={isLoading}
          >
            ⭐ Create My Perfect Jharkhand Trip
          </button>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="results-container">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Creating your perfect Jharkhand adventure...</p>
              </div>
            ) : (
              <div className="trip-results">
                {tripPlan}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .smart-trip-planner {
          min-height: 100vh;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .planner-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        
        .planner-header {
          background: linear-gradient(90deg, #047857 0%, #059669 100%);
          color: white;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .header-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        
        .planner-header h1 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .planner-header p {
          opacity: 0.9;
        }
        
        .form-container {
          padding: 30px;
        }
        
        .form-section {
          margin-bottom: 30px;
        }
        
        .form-section h3 {
          color: #047857;
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 16px;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.2s;
        }
        
        textarea:focus {
          outline: none;
          border-color: #047857;
        }
        
        .places-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 15px;
        }
        
        .place-chip {
          padding: 10px 18px;
          border-radius: 9999px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #047857;
        }
        
        .place-chip.selected {
          background-color: #047857;
          color: white;
        }
        
        .place-chip:not(.selected) {
          background-color: #f0fdf4;
          color: #047857;
        }
        
        .place-chip:not(.selected):hover {
          background-color: #047857;
          color: white;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-group label {
          color: #374151;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        input, select {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #047857;
        }
        
        .activities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 15px;
        }
        
        @media (min-width: 768px) {
          .activities-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .activity-chip {
          padding: 15px;
          border-radius: 10px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        
        .activity-chip.selected {
          background-color: #047857;
          color: white;
          border-color: #047857;
        }
        
        .activity-chip:not(.selected) {
          background-color: #f9fafb;
          color: #374151;
        }
        
        .activity-chip:not(.selected):hover {
          background-color: #047857;
          color: white;
          border-color: #047857;
        }
        
        .generate-button {
          width: 100%;
          background: linear-gradient(90deg, #047857 0%, #059669 100%);
          color: white;
          padding: 18px 30px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }
        
        .generate-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(4, 120, 87, 0.4);
        }
        
        .generate-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .results-container {
          margin-top: 30px;
          padding: 30px;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 20px;
          margin: 30px;
        }
        
        .loading-container {
          text-align: center;
          padding: 40px 0;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #047857;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .trip-results > div {
          margin-bottom: 30px;
        }
        
        .trip-summary {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 25px;
        }
        
        .trip-summary h2 {
          color: #047857;
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }
        
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        @media (min-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .summary-item {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 10px;
        }
        
        .summary-item h4 {
          color: #047857;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .summary-item p {
          font-size: 20px;
          font-weight: bold;
        }
        
        .day-itinerary {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 25px;
        }
        
        .day-header {
          background: linear-gradient(90deg, #047857 0%, #059669 100%);
          color: white;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: bold;
        }
        
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 20px;
          padding: 15px;
          background: #f9fafb;
          border-radius: 10px;
          border-left: 4px solid #047857;
        }
        
        .activity-time {
          background: #047857;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          min-width: 80px;
          text-align: center;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-content h4 {
          color: #047857;
          margin-bottom: 5px;
          font-weight: 600;
        }
        
        .activity-content p {
          color: #374151;
          margin-bottom: 10px;
        }
        
        .activity-tips {
          background: #f0fdf4;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          color: #047857;
        }
        
        .budget-breakdown {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 25px;
        }
        
        .budget-breakdown h3 {
          color: #047857;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }
        
        .budget-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        @media (min-width: 1024px) {
          .budget-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        .budget-item {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 10px;
        }
        
        .budget-item h4 {
          color: #047857;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .budget-item p {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .budget-item small {
          color: #6b7280;
        }
        
        .travel-tips {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .travel-tips h3 {
          color: #047857;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }
        
        .tips-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }
        
        @media (min-width: 768px) {
          .tips-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .tip-item {
          background: #f0fdf4;
          padding: 15px;
          border-radius: 10px;
          border-left: 4px solid #047857;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .smart-trip-planner {
            padding: 10px;
          }
          
          .planner-header {
            padding: 20px;
            flex-direction: column;
            text-align: center;
          }
          
          .form-container {
            padding: 20px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .results-container {
            margin: 15px;
            padding: 20px;
          }
          
          .summary-grid {
            grid-template-columns: 1fr;
          }
          
          .budget-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SmartTripPlanner;