import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RequireAuth = ({children}) => {
    const {currentUser} = useAuth()
    const location = useLocation()

    // if(loading){
    //     return <Loading></Loading>
    // }

    if(!currentUser){
        return <Navigate to="/login" state={{ from :location }} replace></Navigate>
    }

    return children;
};

export default RequireAuth;