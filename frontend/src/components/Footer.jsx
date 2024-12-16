import { Input } from "postcss";
import React from "react";
import { Link } from "react-router-dom";
Input
const Footer = () => {
  return (
    <>
     <footer className="bg-black py-12 mt-[10.4rem] bottom-0 ">
      <div className="container ml-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link to="#" className="flex items-center gap-2">
          
            <span className="text-lg font-semibold text-white">ShopX</span>
          </Link>
          <p className="text-white">
            ShopX is Link leading online retailer offering Link wide variety of high-quality products at affordable prices.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <Link to="/about" className="text-white hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact
          </Link>
          <Link to="#" className="text-white hover:underline">
            FAQ
          </Link>
          <Link to="#" className="text-white hover:underline">
            Terms
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold text-white">Categories</h4>
          <Link to="#" className="text-white hover:underline">
            Electronics
          </Link>
          <Link to="#" className="text-white hover:underline">
            Fashion
          </Link>
          <Link to="#" className="text-white hover:underline">
            Home
          </Link>
          <Link to="#" className="text-white hover:underline">
            Beauty
          </Link>
        </div>
        <div className="grid gap-4">
          <h4 className="text-lg font-semibold text-white">Newsletter</h4>
          <p className="text-white">Subscribe to our newsletter to get the latest updates and exclusive offers.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
