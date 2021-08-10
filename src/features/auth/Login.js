import { unwrapResult } from "@reduxjs/toolkit";
import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { toastError } from "../utils/toastMessage";
import { login } from "./authSlice";

export const Login=()=>{
    const [userCredential,setUserCredential]=useState("");
    const [password,setPassword]=useState("")
    const { token }=useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("idle");

    const loginHandler=async(e)=>{
        e.preventDefault();
        try{
            setStatus("pending")
            const result=await dispatch(login({userCredential:userCredential.toLocaleLowerCase().trim(),password}))
            unwrapResult(result)
            setStatus("success")
        }catch(error){
            console.log(error)
            if(error.status===404){
                toastError("Username or password incorrect")
            }
            setStatus("idle")
        }
    };
    useEffect(()=>{
        if(token){
            navigate('/home')
        }
    },[token,navigate])
    return (
      <div className="bg-grey-lighter mt-4">
        <div className="container max-w-sm mx-auto px-2 pt-5">
          <form
            onSubmit={loginHandler}
            className="bg-white px-6 py-6 rounded shadow-md text-black w-full">
            <h1 className="mb-5 text-3xl text-center">Login</h1>
            <div className="text-center pb-1"></div>
            <input
              type="text"
              className="block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring"
              name="usercred"
              value={userCredential}
              onChange={(e) => setUserCredential(e.target.value)}
              required
              placeholder="Username or Email"
            />
  
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:ring"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
  
            <button
              type="submit"
              disabled={status === "pending" && true}
              className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring my-1">
              {status === "pending" ? "Loading..." : "Login"}
            </button>
  
            <div className="text-grey-dark mt-3 text-center">
              Don't have an account?
              <Link to="/signup" className="border-b border-blue text-blue">
                {" "}
                Sign Up
              </Link>
              .
            </div>
          </form>
        </div>
      </div>
    );
  };