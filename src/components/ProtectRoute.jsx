import { Navigate , useLocation } from "react-router-dom";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children }) => {
  const location = useLocation();
//   const userInfo = useState(Boolean(JSON.parse(localStorage.getItem("userInfo"))[0]) || false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isAuthenticated"));
  

  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;

}

export default ProtectRoute;