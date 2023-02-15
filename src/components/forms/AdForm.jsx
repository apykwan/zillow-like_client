import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';

import { GOOGLE_PLACES_KEY } from '../../config';
import ImageUpload from './ImageUpload';

export default function AdForm({action, type}) {
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        carpark: '',
        landsize: '',
        type: '',
        title: '',
        description: '',
        loading: false
    });

    function onChange(field) {
        return function(event) {
            setAd({
                ...ad,
                [field]: event.target.value
            });
        }
    }
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
                onValueChange={function ({ value }) {
                    setAd({
                        ...ad, 
                        price: value       
                    })
                }}
            />

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
                min="1" 
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

            <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Size of land" 
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

            <button className="btn btn-primary">SUBMIT</button>
            <pre>{JSON.stringify(ad, null, 4)}</pre>
        </>
    );
}