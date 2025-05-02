import { FaUserEdit, FaKey } from "react-icons/fa";
import { RootState } from "../store/store"; // Adjust path if needed
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, updatePassword } from "../BackendApi/apiService";
import { updateUserData } from "../store/authSlice";
import { AppDispatch } from "../store/store"; // Import AppDispatch if available

interface UserData {
  _id: string;
  name: string;
  email: string;
  googleId: string;
  provider: "google" | "local";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const UserProfile = () => {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.userData);

  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return <div className="text-center mt-10 text-red-500">User not found</div>;
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    if (!password) {
      setError("Please enter a new password");
      return false;
    }
    if (!oldPassword) {
      setError("Please enter your old password");
      return false;
    }
    if (oldPassword === password) {
      setError("New password cannot be same as old password");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!confirmPassword) {
      setError("Please confirm your password");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async () => {
    setError("");
    if (!validatePassword()) return;

    try {
      const res = await updatePassword({
        fieldToUpdate: { password, oldPassword },
      });

      if (res.acknowledged === false) {
        setError(res.error);
      } else {
        setError("Password updated successfully");
        setPassword("");
        setConfirmPassword("");
        setOldPassword("");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Something went wrong while updating password");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await updateUser({
        fieldToUpdate: {
          name: formData.name,
          email: formData.email,
        },
      });

      if (res.acknowledged) {
        const newUser: UserData = {
          ...user,
          name: formData.name,
          email: formData.email,
        };
        dispatch(updateUserData(newUser));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          User Profile
        </h2>

        {error && (
          <div
            className={`text-center p-2 rounded-md mb-2 ${
              error.includes("successfully") ? "text-green-600" : "text-red-500"
            }`}
          >
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdateProfile}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              <FaUserEdit className="text-lg" /> Update Profile
            </button>
          </div>

          <hr className="my-6 border-gray-300" />

          <div>
            <label className="text-gray-600">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdatePassword}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              <FaKey className="text-lg" /> Update Password
            </button>
          </div>

          <div>
            <label className="text-gray-600">Account Created</label>
            <input
              type="text"
              value={user.createdAt.slice(0, 10)}
              disabled
              className="mt-1 w-full p-2 border rounded-lg bg-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
