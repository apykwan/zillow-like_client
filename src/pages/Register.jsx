import { useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../context/auth';
import { API } from '../config';

export default function Register() {
    const emailInput = useRef();
    const passwordInput = useRef();

    async function handleSubmit (e) {
        e.preventDefault();

        const email = emailInput.current;
        const password = passwordInput.current;

        if(!email.value || !password.value) return;
        try {
            const { data } = await axios.post(`/pre-register`, { 
                email: email.value, 
                password: password.value 
            });
            password.value = "";

            if(data?.error) return toast.error(data.error);
    
            toast.success("Please check your email to activate your account");
            email.value = "";
            
        } catch (err) {
            console.log(err);
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
                                className="btn btn-primary col-12 my-4"
                                onClick={handleSubmit}
                            >
                                REGISTER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}