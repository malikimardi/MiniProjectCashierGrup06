// import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Login from './pages/Login';
import { checkLogin } from './features/users/usersSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import Home from './pages/Home';
import UpdateProfile from './pages/UpdateProfile';
import Register1 from './pages/Register1';
import Verification from './pages/Verification';
import Login1 from './pages/Login1';

function App() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem("user_token")
  // const userGlobal = useSelector((state) => state.users.user);

  useEffect(() => {
    if(userToken){
      alert(userToken)
      dispatch(checkLogin(userToken))
      
    }
    // alert(userToken)
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path='/' element={<Home />} />
        <Route path='/user/update-profile' element={<UpdateProfile />} />
        <Route path='/user/verification/:token' element={<Verification />} />      
        <Route path="/user/register" element={<Register1 />} />
        <Route path="/user/login" element={<Login1 />} />
      </Routes>

      <div>THIS IS HOME PAGE</div>
      <p>This is paragraph</p>
    </div>
  );
}

export default App;