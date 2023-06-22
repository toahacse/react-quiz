import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NotRequireAuth = ({children}) => {
    const {currentUser} = useAuth()
    const location = useLocation()

    if(currentUser){
        return <Navigate to="/" state={{ from :location }} replace></Navigate>
    }

    return children;
};

export default NotRequireAuth;