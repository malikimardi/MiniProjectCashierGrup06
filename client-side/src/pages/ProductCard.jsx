import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../features/cart/cartSlice";
import Axios from "axios";

import { Input, Select, Button, ButtonGroup } from "@chakra-ui/react";

function ProductCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [categories, setCategories] = useState([]);
  const [products, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8001/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const fetchProductsData = async () => {
    let response = await Axios.get(`http://localhost:8001/product/product/`);
    setProductList(response.data);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id_product === product.id_product
    );
    if (existingItem) {
      dispatch(increaseQuantity(product.id_product));
    } else {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    alert("berhasil menambahkan ke keranjang");
  };

  // const [search, setSearch] = useState(``);
  const [sort, setSort] = useState(`newest`);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
    setCurrentPage(1);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const filteredProducts =
    selectedCategory === 0
      ? products
      : products.filter((p) => p.id_category === selectedCategory);
  const filteredProductsBySearchTerm = filteredProducts.filter((p) =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsOnPage = filteredProductsBySearchTerm.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    filteredProductsBySearchTerm.length / itemsPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderList = () => {
    return (
      productsOnPage
        // .filter((product) => {
        //   return search.toLowerCase() === ""
        //     ? product
        //     : product.product_name.toLowerCase().includes(search);
        // })

        .map((product) => {
          return (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={`http://localhost:8001/${product.product_img}`}
                alt={product.product_name}
                className="w-full h-48 object-cover"
              />

              <div key={product.id_product} className="p-4">
                <h2 className="text-lg font-medium">{product.product_name}</h2>
                <p className="text-lg font-medium text-gray-800">
                  {product.product_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {product.product_desc}
                </p>

                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="solid"
                  colorScheme="pink"
                >
                  Buy
                </Button>
              </div>
            </div>
          );
        })
    );
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  useEffect(() => {
    if (sort === "newest") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.id_product - a.id_product)
      );
    } else if (sort === "lowPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_price - b.product_price)
      );
    } else if (sort === "highPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.product_price - a.product_price)
      );
    } else if (sort === "asc") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_name.localeCompare(b.product_name))
      );
    } else if (sort === "desc") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.product_name.localeCompare(a.product_name))
      );
    }
  }, [sort]);

  return (
    <div className="w-3/4 mx-auto my-5">
      <p className="text-4xl font-bold mx-auto my-4">Product List</p>
      <div className="mx-auto my-1">
        <Input
          value={searchTerm}
          placeholder="Search..."
          onChange={handleSearchChange}
          // onChange={(name) => setSearch(name.target.value)}
        />
      </div>
      <div>
        <Select
          placeholder="Sorted By"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="lowPrice">Lowest Price</option>
          <option value="highPrice">Highest Price</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </Select>
      </div>
      <div>
        <Select onChange={handleCategoryChange}>
          <option value="0">All categories</option>
          {categories.map((category) => (
            <option key={category.id_category} value={category.id_category}>
              {category.category_name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {renderList()}
      </div>
      <div className="items-center hidden space-x-8 lg:flex">
        <Button
          variant="solid"
          colorScheme="pink"
          onClick={() => {
            navigate("/product/addproduct");
          }}
        >
          add new product
        </Button>
      </div>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <ButtonGroup variant="outline" spacing="3">
            <Button
              colorScheme="blue"
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {" "}
              {index + 1}
            </Button>
          </ButtonGroup>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
