import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/auth';

export default function AccountActivate() {
    const [auth, setAuth] = useAuth();
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        token && requestActivation();
    }, [token]);

    async function requestActivation() {
        try {
            const { data } = await axios.post('/register', { token });
            if(data?.error) {
                toast.error(data.error);
                navigate("/");
                return;
            }

            // save in local storage
            localStorage.setItem('zl-auth', JSON.stringify(data));
            // save in context
            setAuth(data);
            toast.success('Successfully logged in. Welcom to Zillow Like App');
            navigate("/");
        } catch(err) {
            console.log(err);
            toast.error('Something went wrong. Please try again later.');
            navigate("/register");
        }
    }

    return (
        <div className="display-1 d-flex justify-content-center align-items-center vh-100">
            Activating, Please Wait...
        </div>
    );
}