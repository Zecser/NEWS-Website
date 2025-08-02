import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser, getUserProfile } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { baseURL } from "../../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await loginUser({ email, password });
      const { data } = await getUserProfile();
      setUser(data); // 🔥 update context immediately
      toast.success(data?.message || "Login successful!");
      setIsSuccess(true); // ✅ Trigger navigation in useEffect
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(`${baseURL}/google-login`, {
          credential: tokenResponse.credential,
        });

        localStorage.setItem("token", res.data.token);

        // ✅ Get the user's info and update context
        const { data } = await getUserProfile();
        setUser(data);

        toast.success("Logged in successfully!");
        setIsSuccess(true);
      } catch (err) {
        toast.error("Google login failed!");
        console.error("Google login failed:", err);
      }
    },
    onError: () => {
      toast.error("Google login failed!");
      // console.log("Google Login Failed");
    },
  });

  // ✅ Trigger navigation in useEffect
  useEffect(() => {
    if (setUser && isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate, setUser]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* ✅ Mobile View */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden relative md:hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400 rounded-full opacity-90"></div>
        <div className="absolute top-32 -left-16 w-32 h-32 bg-orange-300 rounded-full opacity-80"></div>
        <div className="absolute -bottom-24 -right-16 w-48 h-48 bg-orange-500 rounded-full opacity-85"></div>

        <div className="px-8 py-12 relative z-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
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
                className="absolute right-3 bottom-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
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
            Don’t have an account?{" "}
            <span
              className="text-orange-500 font-semibold cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
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
              Welcome Back
            </h2>
            <p className="text-gray-700 text-lg">
              Log in to stay updated with the latest news, personalized just for
              you.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
                  className="absolute right-3 bottom-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
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
              Don’t have an account?{" "}
              <span
                className="text-orange-500 font-semibold cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
