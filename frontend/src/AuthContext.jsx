import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token is stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);  // Call backend to verify token
    }
  }, []);

  // Verify token with the backend
  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`/api/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(response.data.success); // Update auth status
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthenticated(false); // If error, logout the user
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      await axios.get(`/api/userLogout`);
      localStorage.removeItem("token"); // Remove token from localStorage
      setIsAuthenticated(false); // Update auth status to false
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
