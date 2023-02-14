import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
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
        }
    }

    return ok ? <Outlet /> : ""; 
}