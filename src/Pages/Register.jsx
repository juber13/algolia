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
    <div className='container mt-5 p-4 col-lg-3 col-md-6 col-sm-8 col-11 mx-auto bg-white rounded shadow'>
      <h2 className='text-center display-4 mb-4 text-dark'>Register</h2>
      <form className='mb-3' onSubmit={registerUser}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label font-weight-bold'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            placeholder='Enter your name'
            onChange={handleChange}
            value={userInfo.name}
          />
        </div>

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
            value={userInfo.email}
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
            placeholder='Enter your password'
            onChange={handleChange}
            value={userInfo.password}
          />
        </div>

        
         <div>
           <p>Already have an account? <Link to="/login">Login</Link></p>
         </div>

        <button type='submit' className='btn  w-100'>
           Register
        </button>
      </form>
    </div>
  );
};



export default Register


