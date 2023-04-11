import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/users/usersSlice";

function Navbar() {
  const userGlobal = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-blue-300 flex justify-center h-16 gap-8">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Product
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        About
      </button>

      {userGlobal.id > 0 ? (
        <div className="bg-blue-300 flex items-center h-16 gap-8">
          <button
            onClick={() => {
              navigate("/users");
            }}
          >
            Users
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
          {userGlobal.imagePath ? (
            <img
              src={`http://localhost:8001/${userGlobal.imagePath}`}
              alt=""
              srcset=""
              className="w-10 h-10 rounded-full "
            />
          ) : (
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/user/register");
            }}
          >
            Register
          </button>
          <button
            onClick={() => {
              navigate("/user/login");
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Navbar;
