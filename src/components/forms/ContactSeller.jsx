import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth';

export default function ContactSeller({ ad }) {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const nameInput = useRef();
    const emailInput = useRef();
    const messageInput = useRef();
    const phoneInput = useRef();
    const navigate = useNavigate();


    return (
        <>
            <div className="row">
                <div className="col-md-8 offset-lg-2">
                    <h3>Contact {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username }</h3>
                </div>
            </div>   
        </>
    );
}