import React, { useState, useEffect } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const increase = () => {
    setCounter((prevCounter) => Number(prevCounter) + 1);
  };

  const decrease = () => {
    setCounter((prevCounter) => Math.max(1, prevCounter - 1)); // Prevents negative values
  };

  // Handle Wishlist functionality
  const wishlistFunc = async () => {
    try {
      if (isWishlisted) {
        const response = await axios.post(
          '/api/removeWishlist',
          { productId: product._id },
          { withCredentials: true }
        );
  
        if (response.status === 200) {
          setIsWishlisted(false);
          console.log('Product removed from wishlist:', product._id);
        }
      } else {
        const response = await axios.post(
          '/api/addWishlist',
          { productId: product._id },
          { withCredentials: true }
        );
  
        if (response.status === 200) {
          setIsWishlisted(true);
          console.log('Product added to wishlist:', product._id);
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error.response?.data || error.message);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  // Handle Add to Cart functionality
  const addToCart = async () => {
    try {
      const response = await axios.post(
        '/api/addToCart', 
        { productId: product._id, quantity: counter },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        console.log('Product added to cart:', product._id);
        alert('Product added to cart');
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      alert('Failed to add to cart. Please try again.');
    }
  };
  

  // Fetch product and wishlist data
  useEffect(() => {
    const fetchProductAndWishlist = async () => {
      try {
        const productResponse = await axios.get(`/api/getSingleProduct/${id}`, { withCredentials: true });
        const wishlistResponse = await axios.get('/api/getWishlist', { withCredentials: true });
  
        if (productResponse.data.success && wishlistResponse.status === 200) {
          setProduct(productResponse.data.data);
  
          // Check if the current product is in the wishlist
          const isInWishlist = wishlistResponse.data.wishlist.some((item) => item._id === productResponse.data.data._id);
          setIsWishlisted(isInWishlist);
        } else {
          setError('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };
  
    fetchProductAndWishlist();
  }, [id]);

  return (
    <>
      <div className="w-full h-full px-24">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="flex mt-2">
          <div className="flex flex-col gap-4">
            <div className="product-gallery w-[8rem] h-[8rem] bg-slate-200">
              <img src={product?.image} alt={`${product?.title} Image 1`} />
            </div>
            <div className="product-gallery w-[8rem] h-[8rem] bg-slate-200">
              <img src={product?.imageTwo} alt={`${product?.title} Image 2`} />
            </div>
            <div className="product-gallery w-[8rem] h-[8rem] bg-slate-200">
              <img
                src={product?.imageThree}
                alt={`${product?.title} Image 3`}
              />
            </div>
            <div className="product-gallery w-[8rem] h-[8rem] bg-slate-200">
              <img src={product?.imageFour} alt={`${product?.title} Image 4`} />
            </div>
          </div>

          <div className="w-[100%] h-[35rem] ml-4 flex">
            <img
              src={product?.image}
              alt={`${product?.title} Main Image`}
              className=""
            />
          </div>

          <div className="ml-24 flex flex-col gap-2 w-[100%]">
            <h1 className="mb-2 text-3xl font-bold">{product?.title}</h1>
            <h3 className="">⭐⭐⭐⭐⭐ (150 Reviews) | In Stock</h3>
            <h3 className="text-4xl font-bold">{product?.price}₹</h3>
            <p className="items-center content-center justify-center align-middle">
              {product?.description || "Description not available."}
            </p>
            <hr />
            <div className="flex gap-4">
              <div className="flex">
                <button
                  className="items-center justify-center p-4 px-4 align-middle border border-black border-1"
                  onClick={decrease}
                >
                  -
                </button>
                <div className="p-4 px-8 border border-black border-1">
                  {counter}
                </div>
                <button
                  className="p-4 px-4 border border-black border-1"
                  onClick={increase}
                >
                  +
                </button>
              </div>
              <Link
                to={`/checkout/${product?._id}`}
                className="px-6 pt-2 my-2 text-white bg-red-500 rounded-lg"
              >
                Buy Now
              </Link>

              <button
                className="px-6 pt-2 my-2 text-white bg-green-500 rounded-lg"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <div className="flex items-center justify-center align-middle rounded-lg">
                <button
                  className="flex items-center justify-center w-10 h-10 p-0 px-4 align-middle border border-black border-1"
                  onClick={wishlistFunc}
                >
                  {isWishlisted ? (
                    <Favorite style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col mt-14">
              <div className="flex p-4 border border-2 border-black">
                <div className=""></div>
                <div className="">
                  <h1>Free Delivery</h1>
                  <h1>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </h1>
                </div>
              </div>
              <div className="flex p-4 border border-2 border-black">
                <div className=""></div>
                <div className="">
                  <h1>Return Delivery</h1>
                  <h1>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </h1>
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
