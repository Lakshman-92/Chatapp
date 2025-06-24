import React from 'react';
import assets from '../assets/assets';

function RightSidebar({ selectedUser, setSelectedUser }) {
  return (
    <div className="w-full px-4 py-3 overflow-y-auto border-l border-gray-700 text-white">
      {selectedUser ? (
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-20 aspect-square rounded-full object-cover"
          />
          <h1 className="text-lg font-medium">{selectedUser.fullName}</h1>
          <span className={`text-sm ${selectedUser.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
            {selectedUser.isOnline ? 'Online' : 'Offline'}
          </span>

          {/* Logout Button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-sm px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10">
          <p>Select a user to view profile details.</p>
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
