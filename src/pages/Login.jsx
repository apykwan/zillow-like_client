import { useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../context/auth';

export default function Login() {
    const [auth, setAuth] = useAuth();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleSubmit (e) {
        e.preventDefault();
        const email = emailInput.current;
        const password = passwordInput.current;

        if(!email.value) return toast.error("Email and password are required");
        if(!password.value) return toast.error("Password is required");
        setLoading(true);
        try {
            const { data } = await axios.post('/login', { 
                email: email.value, 
                password: password.value 
            });
            password.value = "";
            setLoading(false);

            // for email & password input errors
            if(data?.error) return toast.error(data.error);

            setAuth(data);
            localStorage.setItem('zl-auth', JSON.stringify(data));
            toast.success("Login successful");
            location?.state !== null ? navigate(location.state) : navigate("/dashboard");
        } catch (err) {
            console.log(err);
            setLoading(false);
            // for server failure error
            toast.error("Something went wrong. Please try again later.");
        }
    } 

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Login</h1>
        
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <form>
                            <input 
                                type="text" 
                                placeholder="Enter your email" 
                                className="form-control mb-4" 
                                required
                                autoFocus
                                ref={emailInput}
                            />
                            <input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="form-control mb-4" 
                                required
                                autoFocus
                                ref={passwordInput}
                            />
                            <button 
                                className="btn btn-primary w-100 my-4"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'WAITING...' : 'LOGIN'}
                            </button>
                        </form>

                        <Link className="text-danger" to="/auth/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}