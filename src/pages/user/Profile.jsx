import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import slugify from 'slugify';

import { useAuth } from '../../context/auth';
import { GOOGLE_PLACES_KEY } from '../../config';
import ProfileUpload from '../../components/forms/ProfileUpload';
import loremGenerator from '../../helpers/loremGenerator';

// generate paragraph for description
const { generateParagraphs } = loremGenerator(3);

export default function Profile() {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [address, setAddress] = useState();
    const usernameInput = useRef();
    const nameInput = useRef();
    const emailInput = useRef();
    const companyInput = useRef();
    const phoneInput = useRef();
    const aboutInput = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const userUpdate = {
            username: slugify(usernameInput.current.value).toLowerCase(),
            name: nameInput.current.value,
            email: emailInput.current.value,
            company: companyInput.current.value,
            address,
            phone: phoneInput.current.value,
            about: aboutInput.current.value,
            photo
        }

        const { data } = await axios.put('/update-profile', userUpdate);
        if(data?.error) {
            toast.error(data.error);
            setLoading(false);
            return;
        }
        setAuth({...auth, user: data });

        let fromLS = JSON.parse(localStorage.getItem('zl-auth'));
        fromLS.user = data;
        localStorage.setItem('zl-auth', JSON.stringify(fromLS));
        setLoading(false);
        toast.success('Profile Updated');
    }

    useEffect(function() {
        if(auth.user) {
            usernameInput.current.value = auth.user?.username;
            nameInput.current.value = auth.user?.name;
            emailInput.current.value = auth.user?.email;
            companyInput.current.value = auth.user?.company;
            setAddress(auth.user?.address);
            phoneInput.current.value = auth.user?.phone;
            aboutInput.current.value = auth.user?.about || `${auth.user?.username} - ${generateParagraphs}`;
            setPhoto(auth.user?.photo);
        }
    }, []);

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
            <div className="container-fluid">
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-lg-2 mt-2">
                            <input 
                                type="email"
                                placeholder="Email cannot be updated"
                                className="form-control mb-4"
                                ref={emailInput}  
                                disabled
                            />
                            <ProfileUpload 
                                photo={photo} 
                                setPhoto={setPhoto} 
                                uploading={uploading} 
                                setUploading={setUploading} 
                            />
                        </div>
                        <div className="col-lg-8 offset-lg-1 mt-2">
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text"
                                    placeholder="Update your username"
                                    className="form-control mb-4"
                                    ref={usernameInput}  
                                />
                                <input 
                                    type="text"
                                    placeholder="Enter your name"
                                    className="form-control mb-4"
                                    ref={nameInput}  
                                />
                                <input 
                                    type="text"
                                    placeholder="Enter your company name"
                                    className="form-control mb-4"
                                    ref={companyInput}  
                                />
                                <input 
                                    type="text"
                                    placeholder="Enter your phone number"
                                    className="form-control mb-4"
                                    ref={phoneInput}  
                                />
                                <div className="form-control mb-5">
                                    <GooglePlacesAutocomplete 
                                        apiKey={GOOGLE_PLACES_KEY} 
                                        apiOptions="us"
                                        selectProps={{ 
                                            defaultInputValue: auth.user?.address,
                                            placeholder: "Enter your address",
                                            onChange: function ({ value }) {
                                                setAddress(value.description);
                                            }
                                        }} 
                                    />
                                </div> 
                                <textarea 
                                    placeholder="Enter your introduction"
                                    className="form-control mb-4 no-resize"
                                    ref={aboutInput}
                                    maxLength={200}  
                                >
                                </textarea>
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