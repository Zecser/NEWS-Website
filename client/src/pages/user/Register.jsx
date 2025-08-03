import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { registerUser } from "../../api/auth";
import { Eye, EyeOff } from "lucide-react";
import { baseURL } from "../../api/axios";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password) {
      toast.error("Name, email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!email.endsWith(".com")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await registerUser({ name, email, password });

      toast.success(data?.message || "Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // ✅ Get user info from Google using access_token
        const { data: userInfo } = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        );

        // ✅ Send email, name, picture to backend
         await axios.post(`${baseURL}/google-login`, {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        },{
          withCredentials: true
        });

        
        toast.success("Registered/Login successful!");
        navigate("/home");
      } catch (err) {
        toast.error("Google login failed!");
        console.error("Google login failed:", err);
      }
    },
    onError: () => {
      toast.error("Google login failed!");
      console.log("Google Login Failed");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* ✅ Mobile View */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden relative md:hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400 rounded-full opacity-90"></div>
        <div className="absolute top-32 -left-16 w-32 h-32 bg-orange-300 rounded-full opacity-80"></div>
        <div className="absolute -bottom-24 -right-16 w-48 h-48 bg-orange-500 rounded-full opacity-85"></div>

        <div className="px-8 py-12 relative z-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign Up</h1>
          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <div>
              <label className="text-gray-700 text-sm">Enter your name</label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm">Enter your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="relative">
              <label className="text-gray-700 text-sm">
                Enter your password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <div
                className="absolute right-3 bottom-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {/* <p className="text-right text-blue-600 text-sm mt-1 cursor-pointer hover:underline">
                Forgot Password?
              </p> */}
            </div>

            <div className="relative">
              <label className="text-gray-700 text-sm">
                Confirm your password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <div
                className="absolute right-3 bottom-4 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {/* <p className="text-right text-blue-600 text-sm mt-1 cursor-pointer hover:underline">
                Forgot Password?
              </p> */}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <div
              onClick={() => googleLogin()}
              className="flex items-center justify-center mt-4 cursor-pointer hover:bg-orange-300 w-10 h-10 rounded-full"
            >
              <FcGoogle className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-4 text-sm">
            ALready an user?{" "}
            <span
              className="text-orange-500 font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* ✅ Desktop View */}
      <div className="hidden md:flex min-h-screen w-full">
        {/* Left Branding Section */}
        <div className="md:w-1/2 bg-orange-100 flex flex-col justify-center items-center p-8 relative overflow-hidden">
          <div className="absolute top-8 left-8 w-32 h-32 bg-orange-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-10 right-8 w-40 h-40 bg-orange-300 rounded-full opacity-75"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-500 rounded-full opacity-70"></div>

          <div className="relative z-10 text-center max-w-xs">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">News App</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome
            </h2>
            <p className="text-gray-700 text-lg">
              Register to stay updated with the latest news, personalized just
              for you.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-gray-700 text-sm">Enter your Name</label>
                <input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm">
                  Enter your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="relative">
                <label className="text-gray-700 text-sm">Enter password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" Password"
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                />
                <div
                  className="absolute right-3 bottom-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              <div className="relative">
                <label className="text-gray-700 text-sm">
                  Confirm your password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                />
                <div
                  className="absolute right-3 bottom-4 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="flex items-center justify-center mt-4">
              <div
                onClick={() => googleLogin()}
                className="flex items-center justify-center mt-4 cursor-pointer hover:bg-orange-300 w-10 h-10 rounded-full"
              >
                <FcGoogle className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <span
                className="text-orange-500 font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
