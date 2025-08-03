import { useEffect, useState } from "react";
import { Edit, Moon, Bell, LogOut, ChevronRight, X } from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { editUser } from "../../api/user";
import { logoutUser, getUserProfile } from "../../api/auth";
import Sidebar from "../../components/SideBar";
import BottomNavbar from "../../components/BottomNavbar";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Edituser = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: user } = await getUserProfile();
        console.log(user);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          imageUrl: user.imageUrl || "",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching user data"
        );
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    if (profileImageFile) form.append("imageUrl", profileImageFile);

    try {
      const { data } = await editUser(userId, form);
      toast.success(data?.message || "Profile updated successfully!");
      setFormData((prev) => ({
        ...prev,
        imageUrl: data?.user?.imageUrl || prev.imageUrl,
      }));
      setProfileImageFile(null);
      setShowEditModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const theme = darkMode ? "dark" : "light";
  const isDark = darkMode;

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const { data: user } = await getUserProfile();
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        imageUrl: user.imageUrl || "",
      });
    } catch (error) {
      toast.error("Session expired. Please log in again.", error);
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  fetchUserData();
}, [userId, navigate]);

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar (Desktop Only) */}
      <div className="hidden md:block w-[260px]">
        <Sidebar
          isDarkMode={isDark}
          toggleDarkMode={toggleDarkMode}
          activeTab="profile"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-8 py-10">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-3">
              <img
                src={
                  profileImageFile
                    ? URL.createObjectURL(profileImageFile)
                    : formData.imageUrl
                    ? formData.imageUrl
                    : "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                }
                alt="Profile"
                className="w-24 h-24 object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{formData.name}</h2>
          </div>

          <div
            className={`rounded-2xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Menu Items */}
            {[
              {
                icon: Edit,
                label: "Edit Profile",
                onClick: () => setShowEditModal(true),
              },
              {
                icon: Moon,
                label: "Dark Mode",
                onClick: toggleDarkMode,
                toggle: true,
                toggleState: darkMode,
              },
              {
                icon: Bell,
                label: "Notifications",
                onClick: () => setNotifications(!notifications),
                toggle: true,
                toggleState: notifications,
              },
              {
                icon: LogOut,
                label: "Logout",
                onClick: () => setShowLogoutModal(true),
              },
            ].map(
              ({ icon: Icon, label, onClick, toggle, toggleState }, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 border-b cursor-pointer ${
                    isDark
                      ? "hover:bg-gray-700 border-gray-700"
                      : "hover:bg-gray-200 border-gray-200"
                  }`}
                  onClick={!toggle ? onClick : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </div>
                  {toggle ? (
                    <button
                      onClick={onClick}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        toggleState ? "bg-orange-500" : "bg-gray-500"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          toggleState ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navbar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavbar
          isDarkMode={isDark}
          toggleDarkMode={toggleDarkMode}
          activeTab="profile"
        />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div
            className={`rounded-2xl w-full max-w-md p-6 relative ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-medium text-center mb-6">
              Edit Profile
            </h2>

            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <img
                  src={
                    profileImageFile
                      ? URL.createObjectURL(profileImageFile)
                      : formData.imageUrl
                      ? formData.imageUrl
                      : "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImageFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark
                      ? "bg-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white px-6 py-2 rounded-lg"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                disabled={isLoading}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-orange-500 rounded-2xl w-full max-w-sm p-8 text-center">
            <h2 className="text-white text-xl font-medium mb-8">
              Logout From Account?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edituser;
