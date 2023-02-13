import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit (e) {
        e.preventDefault();

        const email = emailInput.current;
        const password = passwordInput.current;

        if(!email.value) return toast.error("Email and password are required");
        if(!password.value) return toast.error("Password is required");
        setLoading(true);
        try {
            const { data } = await axios.post(`/pre-register`, { 
                email: email.value, 
                password: password.value 
            });
            password.value = "";
            setLoading(false);

            // for email & password input errors
            if(data?.error) return toast.error(data.error);
            // for other errors
            if(!data.ok) return toast.error("Something wrong went wrong. Please try again");
            
            toast.success("Please check your email to activate your account");
            navigate("/");
            
        } catch (err) {
            console.log(err);
            setLoading(false);
            // for server failure error
            toast.error("Something went wrong. Please try again.");
        }
    } 

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Register</h1>
        
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
                                {loading ? 'WAITING...' : 'REGISTER'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}