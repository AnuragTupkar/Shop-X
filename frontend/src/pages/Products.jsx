import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]); // Stores all products

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllProduct");
        console.log("Data received from backend:", response.data);

        // Check if the response indicates success and contains the data array
        if (response.data.success) {
          setData(response.data.data); // Set the data state to the products array
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="flex gap-8 ml-16">
        {data.length > 0 ? (
          data.map((product, index) => (
           
            <Link to={`/product/${product._id}`}>
              <div key={index} className="border p-4 rounded-md shadow  w-52 h-72 ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <h2 className="font-bold text-2xl">{product.title}</h2>
                <p>{product.price}$</p>
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
