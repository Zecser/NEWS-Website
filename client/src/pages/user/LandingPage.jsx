import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* ✅ Mobile View (Hidden on md and above) */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden relative md:hidden">
        {/* Decorative Orange Circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400 rounded-full opacity-90"></div>
        <div className="absolute top-32 -left-16 w-32 h-32 bg-orange-300 rounded-full opacity-80"></div>
        <div className="absolute -bottom-24 -right-16 w-48 h-48 bg-orange-500 rounded-full opacity-85"></div>
        <div className="absolute bottom-20 -left-12 w-24 h-24 bg-orange-200 rounded-full opacity-70"></div>

        <div className="px-8 py-12 relative z-10 text-center">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">News App</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Get Started
            </h2>
            <p className="text-gray-600 text-lg">Start with Login or Sign Up</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/login")}
              className={`w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-xl text-gray-800 font-semibold text-lg transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg active:scale-95 ${
                activeButton === "login"
                  ? "scale-95 bg-orange-50 border-orange-400"
                  : ""
              }`}
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className={`w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-xl text-gray-800 font-semibold text-lg transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg active:scale-95 ${
                activeButton === "signup"
                  ? "scale-95 bg-orange-50 border-orange-400"
                  : ""
              }`}
            >
              Signup
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm mb-4">Or continue with</p>
            <div className="flex justify-center space-x-4">
              <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-red-600 transition-colors">
                G
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Desktop / Tablet View (Hidden on mobile) */}
      <div className="hidden md:flex min-h-screen w-full">
        {/* Left Branding Section */}
        <div className="md:w-1/2 bg-orange-100 flex flex-col justify-center items-center p-8 relative overflow-hidden">
          <div className="absolute top-8 left-8 w-32 h-32 bg-orange-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-10 right-8 w-40 h-40 bg-orange-300 rounded-full opacity-75"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-500 rounded-full opacity-70"></div>

          <div className="relative z-10 text-center max-w-xs">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">News App</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome Back
            </h2>
            <p className="text-gray-700 text-lg">
              Log in to stay updated with the latest news, personalized just for
              you.
            </p>
          </div>
        </div>

        {/* Right Buttons Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Get Started
            </h2>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/login")}
                className={`w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-xl text-gray-800 font-semibold text-lg transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg active:scale-95 ${
                  activeButton === "login"
                    ? "scale-95 bg-orange-50 border-orange-400"
                    : ""
                }`}
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className={`w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-xl text-gray-800 font-semibold text-lg transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg active:scale-95 ${
                  activeButton === "signup" ? "scale-95 bg-orange-600" : ""
                }`}
              >
                Signup
              </button>
            </div>

            <div className="mt-10 border-t pt-6">
              <p className="text-gray-500 text-sm mb-4">Or continue with</p>
              <div className="flex justify-center space-x-4">
                <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-red-600 transition-colors">
                  G
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
