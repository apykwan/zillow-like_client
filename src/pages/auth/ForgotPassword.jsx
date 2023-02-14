import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
    const emailInput = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit (e) {
        e.preventDefault();
        const email = emailInput.current;


        if(!email.value) return toast.error("Email and password are required");

        setLoading(true);
        try {
            const { data } = await axios.post('/forgot-password', { 
                email: email.value
            });

            setLoading(false);

            // for email & password input errors
            if(data?.error) return toast.error(data.error);

            toast.success("Please check your email for password reset link");
            navigate("/");
            
        } catch (err) {
            console.log(err);
            setLoading(false);
            // for server failure error
            toast.error("Something went wrong. Please try again later.");
        }
    } 

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>
        
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
                            <button 
                                className="btn btn-primary w-100 my-4"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'WAITING...' : 'SUBMIT'}
                            </button>
                        </form>

                        <Link className="text-info" to="/login">Back to login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}