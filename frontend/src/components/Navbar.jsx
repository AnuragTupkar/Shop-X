import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FavoriteBorder,
  ShoppingCart,
  Menu,
  X,
  AddCircle,
} from "@mui/icons-material";
import axios from "axios";

import { useAuth } from "../AuthContext"; // Import the useAuth hook

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Access authentication state and logout function
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Fetch user information from the backend
        const response = await axios.get("/api/user-info", { withCredentials: true }); // withCredentials to include cookies
        const { user } = response.data;
        console.log(user)
        // Check user role
        if (user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error fetching user info:", err.message);
        setIsAdmin(false); // Ensure admin link is hidden on error
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="flex py-10 px-10 sm:mx-24 justify-between bg-gray-100">
        <div>
          <NavLink to="/" className="font-bold text-2xl">
            Shop
            <X className="mb-2" />
          </NavLink>
        </div>
        <div className="md:flex gap-8 hidden mt-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline-offset-4  font-bold underline  text-red-500 " : "hover:underline underline-offset-4"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "underline-offset-4  font-bold  underline text-red-500" : "hover:underline underline-offset-4"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "underline-offset-4  font-bold underline text-red-500" : "hover:underline underline-offset-4"
            }
          >
            About
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? "underline-offset-4  font-bold underline text-red-500" : "hover:underline underline-offset-4"
            }
          >
            Products
          </NavLink>
        </div>
        <div className="gap-4 md:flex hidden mt-1">
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "underline text-red-500" : "hover: fill-red-500"
            }
          >
            <FavoriteBorder />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "underline text-red-500" : "hover:underline"
            }
          >
            <ShoppingCart />
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "underline text-red-500" : "hover:underline"
              }
            >
              <AddCircle />
            </NavLink>
          )}
          <div className="p-0 mt-[-2px] md:hidden">
            <Menu />
          </div>
          <NavLink
            to={isAuthenticated ? "/" : "/signup"}
            className="font-bold"
            onClick={isAuthenticated ? logout : null}
          >
            {isAuthenticated ? "Logout" : "Sign up"}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
