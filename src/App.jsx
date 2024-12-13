import { lazy, useEffect } from 'react'
import './App.css'
import axios from 'axios';
const Login = lazy(() => import('./Pages/Login'));
const Register = lazy(() => import('./Pages/Register'));
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Layout from './components/Layout';
import ProtectRoute from './components/ProtectRoute';

function App() {
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
      },

      {
        path: "/login",
        element: (
            <Login />
        ),
      },
      {
        path: "/register",
        element: (
            <Register />
        ),
      },
    ],
  },
]);



  return (
     <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
