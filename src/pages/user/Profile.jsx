import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import slugify from 'slugify';

import { useAuth } from '../../context/auth';
import Sidebar from '../../components/nav/Sidebar';

export default function Profile() {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const usernameInput = useRef();
    const emailInput = useRef();
    const companyInput = useRef();
    const addressInput = useRef();
    const phoneInput = useRef();
    const aboutInput = useRef();
    const photoInput = useRef(); 
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
    }

    useEffect(function() {
        if(auth.user) {
            usernameInput.current.value = auth.user?.username;
            // emailInput.current.value = auth.user?.email;
            // companyInput.current.value = auth.user?.company;
            // addressInput.current.value = auth.user?.address;
            // phoneInput.current.value = auth.user?.phone;
            // aboutInput.current.value = auth.user?.about;
            // photoInput.current.files = auth.user?.photos;
            console.log(auth.user)
        }
    }, []);

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
            <div className="container-fluid">
                <Sidebar />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 mt-2">
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text"
                                    placeholder="Update your username"
                                    className="form-control"
                                    ref={usernameInput}  
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}