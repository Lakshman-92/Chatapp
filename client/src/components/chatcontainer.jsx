import React, { useEffect, useRef, useState } from 'react';
import assets, { messagesDummyData } from '../assets/assets';

const currentUserId = '680f50aaf10f3cd28382ecf2';

const formatMessageTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const chatEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="hidden md:flex w-full h-full items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium text-white opacity-60 leading-relaxed">
            Chat anytime,<br />anywhere
          </p>
        </div>
      </div>
    );
  }

  const filteredMessages = messagesDummyData.filter(
    (msg) =>
      (msg.senderId === currentUserId && msg.receiverId === selectedUser._id) ||
      (msg.receiverId === currentUserId && msg.senderId === selectedUser._id)
  );

  const handleSend = () => {
    if (!message && !image) return;

    const newMsg = {
      _id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: selectedUser._id,
      text: message || '',
      image: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toISOString(),
    };

    messagesDummyData.push(newMsg);
    setMessage('');
    setImage(null);
    setTimeout(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="flex-1 text-lg text-white font-medium flex items-center gap-2">
          {selectedUser.fullName}
          {selectedUser.isOnline && (
            <span className="w-2 h-2 bg-green-500 rounded-full" />
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="back"
          className="md:hidden w-6 h-6 cursor-pointer"
        />
        <img src={assets.help_icon} alt="help" className="max-md:hidden w-5 h-5" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMessages.length === 0 && (
          <p className="text-center text-gray-400 mt-20">Start the conversation ✨</p>
        )}

        {filteredMessages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.senderId === currentUserId
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-300 text-black rounded-bl-none'
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="chat"
                  className="mt-2 rounded-lg max-w-[200px]"
                />
              )}
              <p className="text-[10px] text-right opacity-70 mt-1">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-stone-500 px-4 py-3 flex items-center gap-3 bg-[#1f1f1f]">
        <label className="cursor-pointer">
          <img src={assets.media_icon} alt="media" className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#282828] text-white outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;