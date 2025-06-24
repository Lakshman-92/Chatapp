import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext"; // ✅ Correct import

function App() {
  return (
    
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
   
  );
}

export default App;
