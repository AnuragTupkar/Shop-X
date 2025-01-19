import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Carosel1 from "../assets/Carosel1.png";
import Carosel2 from "../assets/Carosel5.png";
import Carosel3 from "../assets/Carosel4.png";
import HomeAd from "../assets/HomeAd.png";
import LeftFeatured from "../assets/leftFeatured.png";
import RightTopFeatured from "../assets/rightTopFeatured.png";
import BottomLeftFeatured from "../assets/bottomLeftFeatured.png";
import BottomRightFeatured from "../assets/bottomRightFeatured.png";
import Features from "../assets/features.png";

import CatagoryCard from "../components/CatagoryCard";
import {  Games, Headphones, LaptopWindows, PhoneAndroid, Tv, Watch } from "@mui/icons-material";
const Home = () => {
  const images = [Carosel1, Carosel2, Carosel3]; // Add more images as needed
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const caroselId = ["675fdc2622f8d420470518ce", "675fe13c22f8d420470518d4", "675fe47222f8d420470518fa" ]
  return (
    <>
      <div className="relative w-full">
        <div className="relative h-56 overflow-hidden md:h-96 ">
        <Link to={`/product/${caroselId[currentIndex]}`}>
          <img
            src={images[currentIndex]}
            className="absolute block object-cover w-full h-full"
            alt={`Carousel Slide ${currentIndex + 1}`}
          />
          </Link>
          
        </div>

        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 rtl:space-x-reverse">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer start-0 group focus:outline-none"
          onClick={goToPrevious}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer end-0 group focus:outline-none"
          onClick={goToNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      {/* <div className="cards sm:flex justify-center mx-26 gap-[7rem]">
        <Link to="/product">
          <Card />
        </Link>
        <Link to="/product">
          <Card />
        </Link>
        <Link to="/product">
          <Card />
        </Link>
      </div> */}
   
      <div className="flex justify-center mt-20 HomeAd">
        <Link to="/product/67601b14d2a25e1400bae2e0">
          <img src={HomeAd} alt="" />
        </Link>
      </div>

      <div className="featured">
        <p className="mt-20 ml-40">Featured</p>
        <h2 className="ml-40 text-4xl font-bold">New Arrivals</h2>
        <div className="flex justify-center gap-8 mt-20">
          <div className="left-featured">
            <Link to="/product/67601c28d2a25e1400bae2e3">
              <img src={LeftFeatured} alt="" />
            </Link>
          </div>
          <div className="flex flex-col gap-8 right-featured">
            <div className="top-featured ">
            <Link to="/product/6760202cd2a25e1400bae2f9">
              <img src={RightTopFeatured} alt="" />
            </Link>
            </div>
            <div className="flex gap-8 bottom-featured">
              <div className="bottom-left-featured">
              <Link to="/product/6760212ed2a25e1400bae2fd">
                <img src={BottomLeftFeatured} alt="" />
              </Link>
              </div>
              <div className="bottom-right-featured">
              <Link to="/product/6760220dd2a25e1400bae302">
                <img src={BottomRightFeatured} alt="" />
              </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 features ">
          <img src={Features} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
