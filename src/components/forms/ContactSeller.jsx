import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/auth';
import loremGenerator from '../../helpers/loremGenerator';

// generate paragraph for description
const { generateParagraphs } = loremGenerator(3, 12);

export default function ContactSeller({ ad }) {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const nameInput = useRef();
    const emailInput = useRef();
    const messageInput = useRef();
    const phoneInput = useRef();
    const navigate = useNavigate();

    const loggedIn = auth.user !== null && auth.token !== "";

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/contact-seller', {
                email: emailInput.current.value,
                name: nameInput.current.value,
                message: messageInput.current.value,
                phone: phoneInput.current.value,
                adId: ad._id
            });

            if(data?.error) {
                toast.error(data?.error);
                setLoading(false);
                return;
            }

            setLoading(false);
            toast.success(`Enquiry has been sent to the seller ${ad?.postedBy?.username}.`);
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong. Please try again.');
            setLoading(false);
        }
    }

    useEffect(function() {
        if(auth?.user) {
            nameInput.current.value = auth.user?.name;
            emailInput.current.value = auth.user?.email;
            phoneInput.current.value = auth.user?.phone;
            if(!messageInput?.current.value && ad?.postedBy?.username) {
                messageInput.current.value = `Dear ${ad?.postedBy?.username}: ${generateParagraphs} Sincerely, ${auth?.user?.username}`;
            }
        }
    }, [loggedIn, ad]);
    return (
        <>
            <div className="row">
                <div className="col-md-8 offset-lg-2">
                    <h3>Contact {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username }</h3>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            className="form-control mb-4"
                            placeholder="Enter your email"
                            ref={emailInput}
                            disabled={!loggedIn || loading}
                            required
                        />
                        <input 
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter your name"
                            disabled={!loggedIn || loading}
                            ref={nameInput}
                        />
                        <input 
                            type="text"
                            className="form-control mb-4"
                            placeholder="Enter your phone"
                            disabled={!loggedIn || loading}
                            ref={phoneInput}
                        />
                        <textarea
                            className="form-control no-resize mb-4"
                            placeholder="Enter your enquiry" 
                            name="message" 
                            rows="2"
                            ref={messageInput}
                            disabled={!loggedIn || loading}
                            required
                        >
                        </textarea>
                        {!loggedIn ? (
                            <button className="btn btn-outline-warning w-100 mb-4" onClick={() => navigate('/login')}>
                              LOGIN TO SEND ENQUIRY
                            </button>
                        ) : (
                            <button 
                                className="btn btn-outline-primary w-100 mb-4" 
                                disabled={!nameInput.current?.value || !emailInput.current?.value || loading}
                            >
                                {loading ? 'PLEASE WAIT' : 'SEND ENQUIRY'}
                            </button>
                        )}
                    </form>
                </div>
            </div>   
        </>
    );
}