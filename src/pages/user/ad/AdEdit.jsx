import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';
import toast from 'react-hot-toast';

import { GOOGLE_PLACES_KEY } from '../../../config';
import loremGenerator from '../../../helpers/loremGenerator';
import ImageUpload from '../../../components/forms/ImageUpload';

// generate paragraph for description and title
const { generateParagraphs, generateWords } = loremGenerator(6, 10);

export default function AdEdit({ action, type }) {
    const [ad, setAd] = useState({
        _id: '',
        photos: [],
        uploading: false,
        price: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        carpark: '',
        landsize: '',
        title: '',
        description: '',
        loading: false,
        type,
        action,
    });
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    function onChange(field) {
        return function(event) {
            setAd({
                ...ad,
                [field]: event.target.value
            });
        }
    }

    async function handleClick(e) {
        e.preventDefault();
        if(!ad?.address || !ad?.photos?.length || !ad?.landsize || !ad?.title || !ad?.description || !ad?.price) {
            return toast.error("Photo, Address, Size of Land, price, Title, and Description are required!");
        }
       
        try {
            setAd({ ...ad, loading: true });
            const { data } = await axios.put(`/ad/${ad._id}`, ad);
            navigate("/dashboard");

            if(data?.error) {
                toast.error(data.error);
                setAd({...ad, loading: false });
                return;
            }

            toast.success('Ad updated successfully');
            setAd({...ad, loading: false });
        } catch (err) {
            console.log(err);
            setAd({...ad, loading: false });
        }
    }

    async function fetchAd() {
        try {
            setAd({...ad, loading: true });
            const { data } = await axios.get(`/ad/${params.slug}`);
            // ad.price = Number(ad.price);

            setAd({...data.ad, loading: false });
            setLoaded(true);
        } catch (err) {
            console.log(err);
            setAd({...ad, loading: false });
        }
    }

    async function handleDelete() {
        try {
            setAd({ ...ad, loading: true });
            const { data } = await axios.delete(`/ad/${ad._id}`);
            navigate("/dashboard");

            if(data?.error) {
                toast.error(data.error);
                setAd({...ad, loading: false });
                return;
            }

            toast.success('Ad deleted successfully');
            setAd({...ad, loading: false });
        } catch (err) {
            console.log(err);
            setAd({...ad, loading: false });
        }
    }

    useEffect(() => {
        if(params?.slug) fetchAd();
    },[params?.slug]);

    useEffect(function() {
        if(!ad?.description && ad?.address) {
            setAd(prev => ({
                ...prev,
                description: `${ad?.address} - ${generateParagraphs}`,
                title: `${type} for ${action} - ${generateWords}`
            }));
        }
    }, [ad]);
    return (
        <>
            <div className="display-1 bg-primary text-light p-5">Edit Ad</div>
            <div className="container">
                <ImageUpload ad={ad} setAd={setAd} />
                <div className="mb-3 form-control">
                    {ad.address && (
                        <GooglePlacesAutocomplete 
                            apiKey={GOOGLE_PLACES_KEY} 
                            apiOptions="us"
                            selectProps={{ 
                                defaultInputValue: ad?.address,
                                placeholder: "Search for address..",
                                onChange: function ({ value }) {
                                    setAd({
                                        ...ad, 
                                        address: value.description 
                                    });
                                }
                            }} 
                        />
                    )}
                </div>
                {loaded && (
                    <CurrencyInput 
                        className="form-control mb-3" 
                        placeholder="Enter price" 
                        defaultValue={ad.price}
                        onValueChange={(value) => setAd({ ...ad, price: value })}
                    />
                )}

                {ad?.type === "House" && (
                    <>
                        <input 
                            type="number" 
                            min="0" 
                            className="form-control mb-3" 
                            placeholder="Enter how many bedrooms" 
                            value={ad.bedrooms}
                            onChange={onChange("bedrooms")}
                        />

                        <input 
                            type="number" 
                            min="0" 
                            className="form-control mb-3" 
                            placeholder="Enter how many bathrooms" 
                            value={ad.bathrooms}
                            onChange={onChange("bathrooms")}
                        />

                        <input 
                            type="number" 
                            min="0" 
                            className="form-control mb-3" 
                            placeholder="Enter how many carpark" 
                            value={ad.carpark}
                            onChange={onChange("carpark")}
                        />
                    </>
                )}

                <input 
                    type="text" 
                    className="form-control mb-3" 
                    placeholder="Size of land in sqft" 
                    value={ad.landsize}
                    onChange={onChange("landsize")}
                />

                <input 
                    type="text" 
                    className="form-control mb-3" 
                    placeholder="Enter title" 
                    value={ad.title}
                    onChange={onChange("title")}
                />

                <textarea 
                    className="form-control mb-5 no-resize" 
                    placeholder="Enter description" 
                    value={ad.description}
                    onChange={onChange("description")}
                    rows="2"
                />

                <div className="row">
                    <button 
                        className="btn btn-primary col-md-5 mb-5" 
                        onClick={handleClick}
                        disabled={ad.loading}
                    >
                        {ad.loading ? 'SAVING...' : 'SAVE'}
                    </button>

                    <button 
                        className="btn btn-danger col-md-5 offset-md-2 mb-5" 
                        onClick={handleDelete}
                        disabled={ad.loading}
                    >
                        {ad.loading ? 'DELETING...' : 'DELETE'}
                    </button>
                </div>

                
            </div>
        </>
    );
}