import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../auth/authSlice";
export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const logOutHandler = () => {
      dispatch(logout());
      navigate("/login");
    };
    return (
      <button onClick={logOutHandler} className="logout-button flex items-center">
        <span>Logout</span>
        <FiLogOut className="pl-1 text-2xl" />
      </button>
    );
  };