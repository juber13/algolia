import React, { useState } from 'react'

import axios from 'axios'
import {toast} from 'react-toastify'    
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
 const [userInfo , setUserInfo] = useState({name : ""  , email : "" , password : ""});
 const navigate = useNavigate()    

 const handleChange = (e) => {
    const {name , value} = e.target;
    setUserInfo({...userInfo , [name] : value});
    console.log(userInfo)
 }  

 const registerUser = async (e) => {
    e.preventDefault();

     if(!userInfo.name || !userInfo.email || !userInfo.password ){
        toast.error("Please fill all the fields");
        return;
    }
    else{
      localStorage.setItem("userInfo",JSON.stringify(userInfo));
      toast.success("User registered successfully");
      setUserInfo({name: "", email: "", password: ""});
      setTimeout(() => {
         navigate("/login");
      }, 3000);
    } 
 }

 

  return (
    <div className='container m-auto mt-10 bg-white rounded shadow p-10 max-w-md'>
      <h2 className='text-center text-5xl font-serif'>Register</h2>
      <form className='mb-3' onSubmit={registerUser}>
        <div className='mb-3 flex flex-col'>
          <label
            htmlFor='email'
            className='form-label font-weight-bold text-sm'
          >
            User Name
          </label>
          <input
            type='text'
            className='border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 placeholder:text-sm focus:shadow-md'
            id='userName'
            name='name'
            placeholder='Enter userName'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3 flex flex-col'>
          <label
            htmlFor='email'
            className='form-label font-weight-bold text-sm'
          >
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
          <label
            htmlFor='password'
            className='form-label font-weight-bold text-sm'
          >
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
          <p className='text-xs'>
            Already a account?{" "}
            <Link to='/login' className='text-xs text-blue-500 font-extrabold'>
              Login
            </Link>
          </p>
        </div>
        <button
          type='submit'
          className='btn w-100 hover:bg-orange-500 p-2 px-4 rounded-md text-sm mt-3'
        >
          Register
        </button>
      </form>
    </div>
  );
};



export default Register


