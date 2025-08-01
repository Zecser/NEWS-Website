import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/userRoutes/UserRoutes.jsx";
import AdminRoutes from "./routes/adminRoutes/AdminRoutes.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
