import { useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import { Home } from './Pages/Home';
import { ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

function App() {

  const fetchData = async() => {
     try {
      const response = await axios.get("https://hn.algolia.com/api");
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(() => {
     fetchData()
  },[])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
