import { Navigate , useLocation } from "react-router-dom";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children }) => {
  const location = useLocation();
  const userInfo = useState(JSON.parse(localStorage.getItem("userInfo")));
  // const token = Cookie.get("token");  
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;

}

export default ProtectRoute;