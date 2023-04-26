import React, { useState } from "react";
import Axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const userToken = localStorage.getItem("user_token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productName", name);
    formData.append("productPrice", price);
    formData.append("productDesc", description);
    formData.append("file", image);

    try {
      const response = await Axios.post(
        "http://localhost:8001/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          id="productName"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="productPrice"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Price
        </label>
        <input
          type="number"
          name="productPrice"
          id="productPrice"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="productDescription"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Description
        </label>
        <textarea
          name="productDescription"
          id="productDescription"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="productImg"
          className="block text-gray-700 font-bold mb-2"
        >
          Product Image
        </label>
        <input
          type="file"
          name="productImg"
          id="productImg"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
