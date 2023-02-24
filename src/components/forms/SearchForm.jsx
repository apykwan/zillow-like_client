import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import queryString from 'query-string';

import PriceDropdown from '../misc/PriceDropdown';
import { GOOGLE_PLACES_KEY } from '../../config';
import { useSearch } from '../../context/search';

export default function SearchForm() {
    const [search, setSearch] = useSearch();
    const navigate = useNavigate();
    const location = useLocation();

    function actionBtn(action) {
        return function() {
            setSearch(prevState => {
                if(prevState.action === "Rent") {
                    return {
                        ...prevState,
                        action,
                        price: "All price",
                        priceRange: [0, 10000000]
                    };
                }

                if(prevState.action === "Buy") {
                    return {
                        ...prevState,
                        action,
                        price: "All price",
                        priceRange: [0, 10000]
                    };
                }
            });
        }
    }

    function typeBtn(type) {
        return function() {
            type === "House" ?? "Land" 
            setSearch(prevState => ({ ...prevState, type }));
        }
    }

    async function handleSearch() {
        setSearch(prevState => ({ ...prevState, loading: true }));
        try {
            const { results, page, price, loading, ...rest} = search;
            const query = queryString.stringify(rest);

            //check if address has been entered
            if(!search.address) return toast.error("Please tell us the location.");

            const { data } = await axios.get(`/search?${query}`);
            if(data.error) {
                toast.error(data.error);
                return;
            }

            setSearch(prevState => ({
                ...prevState,
                results: data,
                loading: false
            }));

            if(location.pathname !== '/') {
                navigate('/');
            } else {
                setSearch(prevState => ({ ...prevState, page: location.pathname }));
            }
        } catch (err) {
            console.log(err);
            setSearch(prevState => ({ ...prevState, loading: false }));
        }
    }

    useEffect(function() {
        let action = 'Buy';
        if (location.pathname === '/buy') action = "Buy";
        if (location.pathname === '/rent') action = "Rent";

        setSearch(prevState => ({ 
            ...prevState, 
            action,
            page: location.pathname 
        }));
    }, [location.pathname]);

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12 form-control">
                        <GooglePlacesAutocomplete 
                            apiKey={GOOGLE_PLACES_KEY} 
                            apiOptions="us"
                            selectProps={{ 
                                defaultInputValue: search?.address,
                                placeholder: "Search for address..",
                                onChange: function ({ value }) {
                                    setSearch(prevState => ({
                                        ...prevState, 
                                        address: value.description 
                                    }));
                                }
                            }} 
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    {location.pathname === '/' && (
                        <>
                            <button className="btn btn-primary col-lg-2 square" onClick={actionBtn("Buy")}>
                                {search.action === "Buy" ? "✅ Buy" : "Buy"}
                            </button>
                            <button className="btn btn-primary col-lg-2 square" onClick={actionBtn("Rent")}>
                                {search.action === "Rent" ? "✅ Rent" : "Rent"}
                            </button>
                        </>
                    )}
                    <button className="btn btn-primary col-lg-2 square" onClick={typeBtn("House")}>
                        {search.type === "House" ? "✅ House" : "House"}
                    </button>
                    <button className="btn btn-primary col-lg-2 square" onClick={typeBtn("Land")}>
                        {search.type === "Land" ? "✅ Land" : "Land"}
                    </button>
                    <PriceDropdown />
                    <button className="btn btn-danger col-lg-2 square" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    );
}