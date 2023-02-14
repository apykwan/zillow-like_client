import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

import { API } from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        refreshToken: ""
    });

    useEffect(() => {
        let fromLS = JSON.parse(localStorage.getItem('zl-auth'));
        if(fromLS) setAuth(fromLS);
    }, []);

    // config axios
    axios.defaults.baseURL = API;

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };