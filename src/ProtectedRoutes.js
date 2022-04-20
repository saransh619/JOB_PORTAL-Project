import { Navigate, Outlet } from "react-router-dom";
import LoginForm from "./components/pages/LoginForm";
import { useEffect, useState } from "react";



const useAuth = () => {
    const tokenAccess = JSON.parse(localStorage.getItem('user'));
    if(tokenAccess){
        return true;
    }else{
        return false;
    }
}

const ProtectedRoutes = () => {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;