import React, { useState, useEffect } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Product = () => {

  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState("");
  const increase = () => {
    setCounter((prevCounter) => Number(prevCounter) + 1);
  };

  const decrease = () => {
    setCounter((prevCounter) => Math.max(1, prevCounter - 1)); // Prevents negative values
  };
  const {id} = useParams(); 
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        let response = await axios.get(`/api/getSingleProduct/${id}`)
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError(response.data.message);
        }
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[id])
  return (
    <>
      <div className="w-full h-full px-24">
        <h2 className="">Account / fashion / Shoes </h2>
        <div className="flex  mt-2">
          <div className="flex flex-col gap-4">
            <div className="w-[8rem] h-[8rem] bg-red-400">
              <img src={product.image} alt="" />
            </div>
            <div className="w-[8rem] h-[8rem] bg-red-400">
              <img src={product.image} alt="" />
            </div>
            <div className="w-[8rem] h-[8rem] bg-red-400">
              <img src={product.image} alt="" />
            </div>
            <div className="w-[8rem] h-[8rem] bg-red-400">
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="w-[100%] h-[35rem] ml-4  flex">
            <img src={product.image} alt="" className="" />
          </div>
          <div className="ml-24 flex flex-col gap-2 w-[100%] ">
            <h1 className="font-bold text-3xl mb-2">
              {product.title}
            </h1>
            <h3 className="">⭐⭐⭐⭐⭐ (150 Reviews) | In Stock</h3>
            <h3 className="font-bold text-4xl">{product.price}₹</h3>
            <p className="content-center justify-center align-middle items-center">
              The Nike Air MX Super 2500 - Red is a sleek and vibrant sneaker
              that blends style with performance. Its bold red design stands
              out, while the breathable mesh upper ensures comfort. With a
              cushioned Air Max sole for superior support and durability, it's
              perfect for both athletic activities and everyday wear.
            </p>
            <hr />
            <div className="flex gap-4">
              <div className="flex  ">
                <button className="justify-center align-middle items-center border border-1 border-black p-4 px-4" onClick={decrease}>
                  -
                </button>
                <div className="border border-1 border-black p-4 px-8">{counter}</div>
                <button className="border border-1 border-black p-4 px-4" onClick={increase}>
                  +
                </button>
              </div>
              <Link to={`/checkout/${product._id}`} className="bg-red-500 px-6 rounded-lg my-2 pt-2 text-white ">Buy Now</Link>
              <div className="flex justify-center align-middle items-center rounded-lg">
              <button className="border border-1 border-black px-4 p-0 h-10 w-10 justify-center align-middle flex items-center ">
                <FavoriteBorder />
              </button>
              </div>
              
            </div>
            <div className="flex flex-col mt-14 ">
            <div className="flex border border-2 border-black p-4">
              <div className="">

              </div>
              <div className="">
                  <h1>Free Delivery</h1>
                  <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
              </div>
            </div>
            <div className="flex border border-2 border-black p-4">
              <div className="">

              </div>
              <div className="">
                  <h1>Retrun Delivery</h1>
                  <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
              </div>
            </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
