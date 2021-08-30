import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastWarning } from "../utils/toastMessage";
import { userSignUp } from "./authSlice";

export const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const clickSubmitHandler = (e) => {
    e.preventDefault();
    if (values.password !== values.confirm_password) {
      toastWarning("Password No not match");
    } else {
      formSumbit();
    }
  };
  const formSumbit = async () => {
    try {
      setRequestStatus("pending");
      const result = await dispatch(
        userSignUp({
          ...values,
          username: values.username.toLowerCase().trim(),
        })
      );
      unwrapResult(result);
      setValues({
        email: "",
        name: "",
        username: "",
        password: "",
        confirm_password: "",
      });
      navigate("/login");
    } catch (error) {
      if (error.status === 409) {
        toastError("User Already Exists");
      }
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <div className="bg-grey-lighter mt-4">
      <div className="container max-w-sm mx-auto px-2">
        <form
          onSubmit={clickSubmitHandler}
          className="bg-white px-6 py-6 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-5 text-3xl text-center">Register with us</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
            name="name"
            autoFocus={true}
            placeholder="Full Name"
            value={values.name}
            required
            onChange={handleChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring"
            name="username"
            placeholder="Username"
            required
            value={values.username}
            onChange={handleChange}
          />
          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
            name="email"
            required
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
            name="password"
            placeholder="Password"
            value={values.password}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={handleChange}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
            name="confirm_password"
            value={values.confirm_password}
            required
            title="Please confirm password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring my-1"
          >
            {requestStatus === "pending" ? "Loading..." : "Create Account"}
          </button>

          <div className="text-grey-dark mt-3 text-center">
            Already have an account?
            <Link to="/login" className=" border-b border-blue text-blue">
              {" "}
              Log in
            </Link>
            .
          </div>
        </form>
      </div>
    </div>
  );
};
