import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import ProfileEditForm from "../components/ProfileEditForm";
import { Pencil } from "lucide-react";

const Profile = ({ profileData }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">
        {isEdit || isEditingImage ? "Edit your profile" : "Your Profile"}
      </h1>

      {isEdit || isEditingImage ? (
        <ProfileEditForm
          setIsEdit={setIsEdit}
          setMessage={setMessage}
          user={profileData}
          isEditingImage={isEditingImage}
          setIsEditingImage={setIsEditingImage}
        />
      ) : (
        <>
          <div className="relative w-24 h-24">
            <img
              src={
                profileData.profile_image ||
                "https://windows10spotlight.com/wp-content/uploads/2023/01/81a6e74c8adbf7f55406e8c4b80669d5.jpg"
              }
              alt="Profile"
              className="rounded-full w-full h-full object-cover border"
            />
            <button
              onClick={() => setIsEditingImage(true)}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition group"
            >
              <Pencil size={20} className="bg-sky-400 text-white cursor-pointer" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                Edit Picture
              </span>
            </button>
          </div>

          <div className="text-center space-y-1">
            <p>
              <strong>Username:</strong> {profileData.username}
            </p>
            <p>
              <strong>Name:</strong> {profileData.first_name} {profileData.last_name}
            </p>
          </div>
        </>
      )}

      <div className="flex gap-4 mt-2">
        {isEditingImage ? (
          <button
            onClick={() => setIsEditingImage(false)}
            className="border px-3 py-1 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEdit((prev) => !prev);
                setShowChangePassword(false);
              }}
              className="border px-3 py-1 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              {isEdit ? "Cancel" : "Edit"}
            </button>

            <button
              onClick={() => {
                setShowChangePassword((prev) => !prev);
                setIsEdit(false);
                setIsEditingImage(false);
              }}
              className="border px-3 py-1 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              {showChangePassword ? "Cancel" : "Change Password"}
            </button>
          </>
        )}
      </div>

      {message && <p className="text-green-600 text-center mt-2">{message}</p>}

      <div
        className={`mt-4 w-full transition-all duration-300 overflow-hidden ${
          showChangePassword ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        { !isEditingImage && showChangePassword && (
          <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
            <ChangePassword
              setShowChangePassword={setShowChangePassword}
              setMessage={setMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
