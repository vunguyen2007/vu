import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const useAuth=()=>{
    const user=localStorage.getItem('user')
    if(user){
      return true
    } else {
      return false
    }
  }

const  ProtectedRoute=(props) =>{

    const auth=useAuth()
  
    return auth?<Navigate to="/dashboard"/>:<Outlet/>
  }
  

  export default ProtectedRoute;

