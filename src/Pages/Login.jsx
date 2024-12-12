import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Loader from "../components/Loader";
// import Cookies from 'js-cookie'

const Login = () => {
     
     const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
     const [userData , setUserData] = useState({ email: "",password: ""});

     console.log(userInfo);
     const navigate = useNavigate();

     const handleChange = (e) => {
       const { name, value } = e.target;
       setUserData({ ...userData, [name]: value });
     };

     const handleLogin = (e) => {
        e.preventDefault();

        if(!userData.email || !userData.password){
            toast.error("Email or password is required");
            return;
        }

        if(userData.email === userInfo.email && userData.password === userInfo.password){
            toast.success("Login Successfully");
            navigate("/");
        }
        else{
            toast.error("Invalid Credentials");
            return;
        } 
     }


  return (
    <div className='container mt-5 p-4 col-lg-3 col-md-6 col-sm-8 col-11 mx-auto bg-white rounded shadow'>
      <h2 className='text-center display-4 mb-4 text-dark'>Login</h2>
      <form className='mb-3' onSubmit={handleLogin}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label font-weight-bold'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='Enter your email'
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label font-weight-bold'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            onChange={handleChange}
            placeholder='Enter your password'
          />
        </div>
        <div>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </div>
        <button type='submit' className='btn w-100 hover:bg-orange-500'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
