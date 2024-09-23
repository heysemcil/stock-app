import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PrivateRouter() {

    const currentUser = sessionStorage.getItem('username') || null;

    if(!currentUser){
        toast.error('You Need to login First')
        return <Navigate to="/" replace/>
    }else {
        return <Outlet/>
    }
}
