import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/getAllProduct");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updatedProduct = { title, image, price, description };
        await axios.post("/api/updateProduct", updatedProduct);
        setIsEditing(false);
        setEditingProductId(null);
      } else {
        const newProduct = { title, image, price, description };
        await axios.post("/api/createProduct", newProduct);
      }
      setTitle("");
      setImage("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(`/api/deleteProduct?id=${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProductId(product._id);
    setTitle(product.title);
    setImage(product.image);
    setPrice(product.price);
    setDescription(product.description);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-4xl uppercase font-semibold  mb-10">
        Admin Panel
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-600">Product Title</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Image URL</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter image link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Image 2 URL</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter image link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Image 3 URL</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter image link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Image 4 URL</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter image link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Price</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Catagories</span>
              <input
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-600">Description</span>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                rows="3"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {isEditing ? "Update Product" : "Submit Product"}
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Product List</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {products.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr
                    key={product._id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border px-4 py-2">{product.title}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="border px-4 py-2">{product.price}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 p-4">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
