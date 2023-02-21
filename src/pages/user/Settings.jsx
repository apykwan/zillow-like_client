import { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/auth';

export default function Settings() {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(null);
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        const password = passwordInput.current.value;
        const confirmPassword = confirmPasswordInput.current.value;
        setLoading(true);
        
        if (password.length < 4 || confirmPassword.length < 4 ) {
            toast.error("Password must be at least 4 characters long.");
            passwordInput.current.value = "";
            confirmPasswordInput.current.value = "";
            setLoading(false);
            return;
        }

        if(password !== confirmPassword) {
            toast.error("Password and confirm password don't match. Please try again.");
            confirmPasswordInput.current.value = "";
            setLoading(false);
            return;
        }
  
        const { data } = await axios.put('/update-password', { password });
        if(data?.error) {
            toast.error(data.error);
            setLoading(false);
            return;
        }

        toast.success('Password Updated');
        setLoading(false);
        passwordInput.current.value = "";
        confirmPasswordInput.current.value = "";
    }

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
            <div className="container-fluid">
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 mt-2">
                            <form onSubmit={handleSubmit}>
                                <small className="text-muted mb-1">Password must be at least 4 characters long</small>
                                <input 
                                    type="password"
                                    placeholder="Enter your new password"
                                    className="form-control mb-4"
                                    ref={passwordInput}  
                                />
                                <input 
                                    type="password"
                                    placeholder="Confirm your new password"
                                    className="form-control mb-4"
                                    ref={confirmPasswordInput}  
                                />  
                                <button className="btn btn-primary w-100 mb-4" disabled={loading}>
                                    {loading ? 'PROCESSING...' : 'UPDATE PROFILE'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}