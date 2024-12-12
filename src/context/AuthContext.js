import React, { createContext, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("authToken", response.data.token);
      setLoginUser({ email });
    } catch (error) {
      console.error("Invalid credentials or other error:", error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setLoginUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ loginUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
