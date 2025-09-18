import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  doSignInwithEmailAndPassword,
  docreateuserwithEmailAndPassword,
  doSignInWithGoogle,
} from '../../firebase/auth'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await doSignInwithEmailAndPassword(email, password, rememberMe);
        alert('Login successful!');
        navigate('/');
      } else {
        await docreateuserwithEmailAndPassword(email, password);
        alert('Account created successfully!');
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      alert(`Authentication error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await doSignInWithGoogle(rememberMe);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      setError(error.message);
      alert(`Login error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Image Section */}
      <div className="w-full md:w-1/2 lg:w-3/5 relative">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://cdn.dribbble.com/users/795597/screenshots/3569676/travel-planning__1_.gif')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-90/50 flex items-center justify-center p-12">
            <div className="text-white max-w-md">
              <h1 className="text-4xl font-bold mb-4">Discover Your Next Adventure</h1>
              <p className="text-xl">Join our community of travelers and explore the world's most beautiful destinations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-20 bg-purle-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Travel Explorer</h1>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {isLogin ? 'Sign in to your account to continue your journey' : 'Sign up to start your journey'}
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            {isLogin && (
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition duration-200">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="relative flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-sm">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 w-full disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
              </svg>
              Google
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-600 hover:text-blue-700 transition duration-200 focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
