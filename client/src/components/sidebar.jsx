import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // ✅ capital C


import assets from "../assets/assets";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { authUser, logout, onlineUsers } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users");
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-[#8185B2]/10 h-full p-4 rounded-r-xl overflow-y-auto text-white border-r border-gray-600 w-full max-w-[220px]">
      {/* Header */}
      <div className="pb-4">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-24" />
          {/* Dropdown Menu for Logout/Profile */}
          <div className="relative group">
            <img src={assets.menu_icon} alt="menu" className="w-6 h-6 cursor-pointer" />
            <div className="hidden group-hover:flex flex-col absolute right-0 bg-[#282142] rounded shadow-md mt-2 z-10">
              <button
                className="px-4 py-2 hover:bg-gray-700 text-sm"
                onClick={() => setSelectedUser({ _id: "profile", fullName: "My Profile" })}
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2 hover:bg-gray-700 text-sm"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-[#282142] px-3 py-2 rounded-md mt-4">
          <img src={assets.search_icon} alt="Search" className="w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col gap-2 pt-2">
        {users.map((user) => (
          <div
            key={user._id}
            className={`relative flex items-center gap-3 p-2 rounded-md cursor-pointer transition hover:bg-[#ffffff1a] ${
              selectedUser?._id === user._id ? "bg-[#ffffff1a]" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative">
              <img
                src={user.profilePic || assets.avatar_icon}
                alt={user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
              )}
            </div>
            <div className="flex flex-col leading-5">
              <p className="text-sm font-medium">{user.fullName}</p>
              <span
                className={`text-xs ${
                  onlineUsers.includes(user._id) ? "text-green-400" : "text-neutral-400"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
