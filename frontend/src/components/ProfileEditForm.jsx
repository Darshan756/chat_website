import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProfileEditForm = ({
  user,
  setMessage,
  setIsEdit,
  isEditingImage,
  setIsEditingImage,
}) => {
  const [textData, setTextData] = useState({
    username: user?.username || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.patch("/auth/edit-profile", textData);
      if (response.status === 200) {
        setMessage("Profile details updated successfully!");
        setIsEdit(false);
      }
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.error || "Update failed");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("profile_picture", image);

    try {
      const response = await axiosPrivate.patch("/auth/edit-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setMessage("Profile picture updated!");
        setIsEditingImage(false); 
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Image upload failed");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm mx-auto">
      {isEditingImage ? (
        <form onSubmit={handleImageSubmit} className="border p-4 rounded-lg shadow w-50">
          <label className="block text-gray-700 mb-1 font-medium">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded p-2 mb-3"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Picture
          </button>
        </form>
      ) : (
        // ---------- Text Form ----------
        <form onSubmit={handleTextSubmit} className="border p-4 rounded-lg shadow">
          <label className="block text-gray-700 mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={textData.username}
            onChange={handleTextChange}
            className="w-full border rounded p-2 mb-3"
          />

          <label className="block text-gray-700 mb-1 font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={textData.first_name}
            onChange={handleTextChange}
            className="w-full border rounded p-2 mb-3"
          />

          <label className="block text-gray-700 mb-1 font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={textData.last_name}
            onChange={handleTextChange}
            className="w-full border rounded p-2 mb-3"
          />

          <button
            type="submit"
            className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Details
          </button>
        </form>
      )}

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default ProfileEditForm;
