// src/pages/Profiles.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profiles = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const { authUser, updateProfile } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = { fullName, bio };
    if (selectedImg) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        profileData.profilePic = reader.result;
        await updateProfile(profileData);
        navigate("/");
      };
    } else {
      await updateProfile(profileData);
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(file);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg p-6">
        <form className="flex flex-col gap-5 flex-1 w-full" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold">Profile Details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="avatar"
              className="w-20 h-20 object-cover rounded-full border border-gray-500"
            />
            <span className="underline text-sm">Choose Profile Picture</span>
          </label>
          <input
            type="file"
            id="avatar"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={handleFileChange}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-transparent border border-gray-400 px-4 py-2 rounded outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled
            className="bg-transparent border border-gray-400 px-4 py-2 rounded outline-none opacity-50 cursor-not-allowed"
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="bg-transparent border border-gray-400 px-4 py-2 rounded outline-none resize-none"
          />

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profiles;
