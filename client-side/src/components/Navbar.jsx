import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/users/usersSlice";

function Navbar() {
  const userGlobal = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container flex justify-around py-8 mx-auto bg-white">
      <div class="flex items-center">
        <h3 class="text-2xl font-medium text-blue-500">LOGO</h3>
      </div>
      <div class="items-center hidden space-x-8 lg:flex">
        <button>Home</button>
        <button>Dashboard</button>
        <button>product</button>
      </div>

      {userGlobal.id > 0 ? (
        <div className="bg-black text-gray-50 flex items-center h-16 gap-8">
          <button
            onClick={() => {
              navigate("/menu");
            }}
          >
            Menu
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("user_token");
              dispatch(resetUser());
              alert("Logout Berhasil");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div class="flex items-center space-x-2">
            <button
              class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md"
              onClick={() => {
                navigate("/user/register");
              }}
            >
              Register
            </button>
            <button
              class="px-4 py-2 text-gray-200 bg-gray-400 rounded-md"
              onClick={() => {
                navigate("/user/login");
              }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
