import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  let isAdmin = false;
  let isAuthenticated = false;

  if (token) {
    try {
      // Manually decode the token
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64)); // Decode base64 to string and parse to JSON
      console.log(payload); // Log the entire payload to see its structure

      // Check if the role is 'admin'
      isAdmin = payload?.role === "admin";
      isAuthenticated = true;

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (payload?.exp < currentTime) {
        console.log("Token expired");
        isAuthenticated = false;
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  if (!isAuthenticated || !isAdmin) {
    console.log("Redirecting to /signin");
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
