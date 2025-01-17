import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]); // Stores all products
  const [filteredData, setFilteredData] = useState([]); // Stores filtered products
  const [category, setCategory] = useState("All"); // Tracks the selected category

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllProduct");
        console.log("Data received from backend:", response.data);

        if (response.data.success) {
          setData(response.data.data);
          setFilteredData(response.data.data); // Initially show all products
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (category) => {
    setCategory(category);

    if (category === "All") {
      setFilteredData(data); // Show all products
    } else {
      const filtered = data.filter((product) => product.catagory === category);
      setFilteredData(filtered);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <h2 className="font-bold text-xl uppercase mb-4">Category</h2>
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => handleFilter("All")}
          className={`px-4 py-2 rounded ${
            category === "All" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilter("Phones")}
          className={`px-4 py-2 rounded ${
            category === "Phones" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          Phones
        </button>
        <button
          onClick={() => handleFilter("Gaming")}
          className={`px-4 py-2 rounded ${
            category === "Gaming" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          Gaming
        </button>
        <button
          onClick={() => handleFilter("Laptop")}
          className={`px-4 py-2 rounded ${
            category === "Laptop" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          Laptop
        </button>
        <button
          onClick={() => handleFilter("Headphones")}
          className={`px-4 py-2 rounded ${
            category === "Headphones" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          Headphones
        </button>
        <button
          onClick={() => handleFilter("SmartWatch")}
          className={`px-4 py-2 rounded ${
            category === "SmartWatch" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          SmartWatch
        </button>
        <button
          onClick={() => handleFilter("Tv")}
          className={`px-4 py-2 rounded ${
            category === "Tv" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 hover:text-white hover:bg-red-600"
          }`}
        >
          Tv
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {filteredData.length > 0 ? (
          filteredData.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`}>
              <div className="border p-4 rounded-md shadow w-52 h-72 bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-scale-down rounded-md"
                />
                <h2 className="font-bold text-lg truncate mt-2">
                  {product.title}
                </h2>
                <p className="text-gray-700 mt-1">{product.price}₹</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
