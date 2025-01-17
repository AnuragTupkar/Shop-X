import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/getWishlist', { withCredentials: true });
        setWishlist(response.data.wishlist); // Assuming the response contains the wishlist array
      } catch (error) {
        console.error('Error fetching wishlist:', error.response?.data || error.message);
        setError('Failed to fetch wishlist. Please try again later.');
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="w-full h-full px-24">
      <h1 className="mb-4 text-3xl font-bold">My Wishlist</h1>
      {error && <div className="text-red-500">{error}</div>}
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center p-4 border border-gray-300 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-40 mb-2"
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.price}₹</p>
              <Link
                to={`/product/${product._id}`}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
