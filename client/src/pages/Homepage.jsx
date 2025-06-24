import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full h-screen px-10 md:px-20 lg:px-40 py-10 md:py-16 lg:py-20 bg-[#121212] text-white">
      <div
        className={`h-full rounded-2xl border border-gray-700 backdrop-blur-lg grid overflow-hidden transition-all duration-300 ease-in-out 
          ${
            selectedUser
              ? 'grid-cols-[1fr_2.5fr_1fr]' // More space for chat when active
              : 'grid-cols-[1fr_0fr_1fr]'    // Hide chat column
          }`}
      >
        {/* Sidebar (Left) */}
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

        {/* Chat Section (Middle) */}
        <div className={`${selectedUser ? 'block' : 'hidden'} sm:block`}>
          <ChatContainer
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>

        {/* Right Sidebar */}
        <RightSidebar selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Homepage;
