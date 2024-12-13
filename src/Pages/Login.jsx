import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Loader from "../components/Loader";
// import Cookies from 'js-cookie'

const Login = () => {
     
     const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
     const [userData , setUserData] = useState({ email: "",password: ""});
     const [loggedIn, setLoggedIn] = useState(false);

     console.log(userInfo);
     const navigate = useNavigate();

     const handleChange = (e) => {
       const { name, value } = e.target;
       setUserData({ ...userData, [name]: value });
     };

     const handleLogin = (e) => {
        e.preventDefault();

        if(userInfo == null){
          toast.error("Please register first");
            return;
        }


        if(!userData.email || !userData.password){
            toast.error("Email or password is required");
            return;
        }

        if(userData.email === userInfo.email && userData.password === userInfo.password){
            toast.success("Login Successfully");
            setLoggedIn(true);
            localStorage.setItem("isAuthenticated", true);
            navigate("/");
        }
        else{
            toast.error("Invalid Credentials");
            return;
        } 
     }


  return (
    <div className='container m-auto mt-10 bg-white rounded shadow p-10 max-w-md'>
      <h2 className='text-center text-5xl font-serif'>Login</h2>
      <form className='mb-3' onSubmit={handleLogin}>
        <div className='mb-3 flex flex-col'>
          <label htmlFor='email' className='form-label font-weight-bold text-sm'>
            Email
          </label>
          <input
            type='email'
            className='border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 placeholder:text-sm focus:shadow-md'
            id='email'
            name='email'
            placeholder='Enter your email'
            onChange={handleChange}
          />
        </div>

        <div className='mb-3 flex flex-col'>
          <label htmlFor='password' className='form-label font-weight-bold text-sm'>
            Password
          </label>
          <input
            type='password'
            className='border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 placeholder:text-sm focus:shadow-md'
            id='password'
            name='password'
            onChange={handleChange}
            placeholder='Enter your password'
          />
        </div>
        <div>
          <p className="text-xs">
            Don't have an account? <Link to='/register' className="text-xs text-blue-500 font-extrabold">Register</Link>
          </p>
        </div>
        <button type='submit' className='btn w-100 hover:bg-orange-500 p-2 px-4 rounded-md text-sm mt-3'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
