import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import AdCard from '../components/cards/AdCard';
import SearchForm from '../components/forms/SearchForm';
import { useAuth } from '../context/auth';

export default function Home() {
    const [auth, setAuth] = useAuth();
    const [adsForSell, setAdsForSell] = useState([]);
    const [adsForRent, setAdsForRent] = useState([]);

    useEffect(() => {
        fetchAds();
    }, []);

    async function fetchAds() {
        try {
            const { data } = await axios.get("/ads");
            setAdsForSell(data.adsForSell);
            setAdsForRent(data.adsForRent);
        } catch (err) {
            toast.error(err);
        }
    }
    return (
        <>
            <SearchForm />
            <h1 className="display-1 bg-primary text-light p-5">For Sell</h1>
            <div className="container">
                <div className="row">
                    {adsForSell?.map(ad => (
                        <AdCard key={ad._id} ad={ad} />
                    ))}
                </div>
            </div>

            <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
            <div className="container">
                <div className="row">
                    {adsForRent?.map(ad => (
                        <AdCard key={ad._id} ad={ad} />
                    ))}
                </div>
            </div>
        </>
    );
}