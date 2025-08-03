import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../../api/auth";
import { toast } from "react-toastify";

function ResetPassword() {
//   const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = useParams().token
  console.log(token)



  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await resetPasswordAPI(token, newPassword);
      console.log(token);
      toast.success(res.data.message);
      setNewPassword("");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef1df] text-black">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ borderTop: "6px solid #ff6a00" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#ff6a00]">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

         <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-3 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#ff6a00] hover:bg-orange-700 text-white p-3 rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
