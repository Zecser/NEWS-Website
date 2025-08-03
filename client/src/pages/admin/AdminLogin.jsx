import { useEffect, useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { getAdminProfile, loginAdmin } from "../../api/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAdmin } = useContext(AdminAuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      await loginAdmin({ email, password });
      const { data } = await getAdminProfile();
      setSuccess(true);
      setAdmin(data.admin);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && setAdmin) {
      navigate("/admin/news");
    }
  }, [success, navigate, setAdmin]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT PANEL (Desktop only) */}
      <div className="hidden md:flex w-1/2 bg-[#FCEBD5] relative overflow-hidden flex-col justify-center items-center p-10">
        {/* Decorative Circles */}
        <div className="absolute w-[220px] h-[220px] bg-orange-500 rounded-full -top-[60px] -left-[60px]" />
        <div className="absolute w-[200px] h-[200px] bg-orange-500 rounded-full top-[30%] -right-[50px]" />
        <div className="absolute w-[180px] h-[180px] bg-orange-500 rounded-full -bottom-[40px] -left-[40px]" />
        <div className="absolute w-[160px] h-[160px] bg-orange-500 rounded-full -bottom-[80px] right-[-80px]" />
        <div className="absolute w-6 h-6 bg-orange-500 rounded-full top-[10%] right-[5%]" />
        <div className="absolute w-5 h-5 bg-orange-500 rounded-full top-[45%] left-[45%]" />
        <div className="absolute w-5 h-5 bg-orange-500 rounded-full bottom-[20%] left-[20%]" />
        <div className="absolute w-5 h-5 bg-orange-500 rounded-full bottom-[10%] right-[25%]" />

        {/* Welcome Text */}
        <div className="z-10 text-center px-6">
          <h1 className="text-4xl font-bold text-black">News App</h1>
          <h2 className="text-2xl font-semibold mt-4 text-black">Welcome Back</h2>
          <p className="mt-4 text-sm text-black font-medium max-w-xs">
            Log in to stay updated with the latest news, personalized just for you.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL (Login Form) */}
      <div className="relative w-full md:w-1/2 bg-white flex items-center justify-center px-4 sm:px-6 py-10">
        {/* Circles (Mobile only) */}
        <div className="absolute block md:hidden w-[260px] h-[260px] bg-orange-500 rounded-full -top-[100px] -left-[80px] z-0" />
        <div className="absolute block md:hidden w-[280px] h-[280px] bg-orange-500 rounded-full -bottom-[100px] -right-[80px] z-0" />

        <form
          onSubmit={submitHandler}
          className="w-full max-w-xs sm:max-w-sm z-10 space-y-6 bg-transparent"
        >
          <h2 className="text-3xl font-bold text-center text-black">
           Admin Login
          </h2>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow focus:outline-none bg-white text-sm"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute top-3 left-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full shadow focus:outline-none bg-white text-sm"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                className="absolute top-3 right-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className="absolute top-3 right-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
