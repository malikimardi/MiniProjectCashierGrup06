// import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Login from "./pages/Login";
import { checkLogin } from "./features/users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import Verification from "./pages/Verification";

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  // const userGlobal = useSelector((state) => state.users.user);

  useEffect(() => {
    if (userToken) {
      alert(userToken);
      dispatch(checkLogin(userToken));
    }
    // alert(userToken)
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/product" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/user/verification/:token" element={<Verification />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
