import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';
import { LoremIpsum } from "lorem-ipsum";
import toast from 'react-hot-toast';

import { GOOGLE_PLACES_KEY } from '../../config';
import ImageUpload from './ImageUpload';

// generate paragraph for description and title
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 1,
        min: 1
    },
    wordsPerSentence: {
        max: 32,
        min: 24
    }
});

export default function AdForm({ action, type }) {
    const [ad, setAd] = useState({
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
    const navigate = useNavigate();

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
        if(!ad?.address || !ad?.photos?.length || !ad?.landsize || !ad?.title || !ad?.description) {
            return toast.error("Photo, Address, Size of Land, Title, and Description are required!");
        }
       
        try {
            setAd({ ...ad, loading: true });
            const { data } = await axios.post('/ad', ad);
            navigate("/dashboard");

            if(data?.error) {
                toast.error(data.error);
                setAd({...ad, loading: false });
                return;
            }

            toast.success('Ad created successfully');
            setAd({...ad, loading: false });
        } catch (err) {
            console.log(err);
            setAd({...ad, loading: false });
        }
    }

    useEffect(() => {
        if(!ad?.description && ad?.address) {
            setAd(prev => ({
                ...prev,
                description: `${ad?.address} - ${lorem.generateParagraphs(2)}`,
                title: `${type} for ${action} - ${lorem.generateWords(7)}`
            }));
        }

    }, [ad]);
    return (
        <>
            <ImageUpload ad={ad} setAd={setAd} />
            <div className="mb-3 form-control">
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
            </div>
            <CurrencyInput 
                className="form-control mb-3" 
                placeholder="Enter price" 
                defaultValue={ad.price}
                onValueChange={(value) => setAd({ ...ad, price: value })}
            />

            {type === "House" && (<>
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
            /></>)}

            <input 
                type="number" 
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
                className="form-control mb-3 no-resize" 
                placeholder="Enter description" 
                value={ad.description}
                onChange={onChange("description")}
                rows="2"
            />

            <button 
                className="btn btn-primary w-100 mb-5" 
                onClick={handleClick}
                disabled={ad.loading}
            >
                {ad.loading ? 'SAVING...' : 'SUBMIT'}
            </button>
        </>
    );
}