import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const PrivateRoute = () => {
  const { handleClick, token } = useAppContext();
  const location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      handleClick();
    }
  }, []);
  return token ? <Outlet /> : navigate(location.state?.from || "/");
};

export default PrivateRoute;
