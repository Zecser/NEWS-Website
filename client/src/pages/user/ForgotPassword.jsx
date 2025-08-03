import { useState } from "react";
import { forgotPasswordAPI } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { use } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await forgotPasswordAPI(email);
      console.log(res);
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdebcd]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-orange-500"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white hover:bg-orange-600 p-3 rounded font-semibold transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
