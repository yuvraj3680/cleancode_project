import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
 console.log("suceesf")
  return <Navigate to="/login" />;
};

export default Logout; // Exporting the component as default
