import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminProtected({ children }) {
  const user = useSelector((state) => state.userSlice);
  return user?.userInfo?.admin ? children : <Navigate to='/' /> ;
}
