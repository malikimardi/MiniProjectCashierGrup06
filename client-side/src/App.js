// import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Login from "./pages/Login";
import { checkLogin } from "./features/users/usersSlice";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import AddProduct from "./pages/addProduct";
import AddCategory from "./pages/addCategory";
import EditProduct from "./pages/EditProduct";

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  // const userGlobal = useSelector((state) => state.users.user);

  useEffect(() => {
    if (userToken) {
      // alert(userToken);
      dispatch(checkLogin(userToken));
    }
    // alert(userToken)
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/product" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/product/addProduct" element={<AddProduct />} />
        <Route path="/category/addCategory" element={<AddCategory />} />
        <Route path="/product/editProduct" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
