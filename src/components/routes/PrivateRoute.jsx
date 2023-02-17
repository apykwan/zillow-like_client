import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';

import { useAuth } from '../../context/auth';

export default function PrivateRoute() {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(auth?.token) getCurrentUser();
    }, [auth?.token]);

    async function getCurrentUser() {
        try {
            await axios.get("/current-user", {
                headers: {
                Authorization: auth?.token,
                },
            });
            setOk(true);
        } catch (err) {
            setOk(false);
            toast.error("Please refresh the page.");
        }
    }

    return ok ? <Outlet /> : ""; 
}