// /client/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const signup = async ({ fullName, email, password, bio }) => {
    const res = await axios.post("/api/auth/signup", {
      fullName,
      email,
      password,
      bio,
    });
    setAuthUser(res.data.user);
  };

  const login = async ({ email, password }) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setAuthUser(res.data.user);
  };

  const updateProfile = async (updatedUser) => {
    const res = await axios.put("/api/users/update", updatedUser);
    setAuthUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ authUser, signup, login, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
