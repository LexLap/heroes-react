import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const PrivateRoute = () => {
    const { userData } = useContext(LoginContext);
    const auth = userData.token?.length > 1

    return auth ?
        <Outlet />
        :
        <Navigate to={{ pathname: "/login", state: { needToLogin: true } }} />
}


export default PrivateRoute;