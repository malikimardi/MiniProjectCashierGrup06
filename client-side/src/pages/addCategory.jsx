import React, { useState } from "react";
import axios from "axios";
const userToken = localStorage.getItem("user_token");

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
  });

  const addCategory = () => {
    axios
      .post(
        "http://localhost:8001/category",
        {
          categoryName: category.name,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto py-12">
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={category.categoryName}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
