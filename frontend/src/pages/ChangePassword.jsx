import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ChangePassword = ({setShowChangePassword,message,setMessage}) => {
  const axiosPrivate = useAxiosPrivate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await axiosPrivate.patch("/auth/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      });

      if(response.status === 200) {
        console.log(response.data)
        setMessage(response?.data?.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowChangePassword(false)
      }
      else if(response.status === 400){
        console.log(response.data)
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Failed to update password."
      );
      
    }
  };

  return (
    <div className="w-full bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-center mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 mt-2 font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
