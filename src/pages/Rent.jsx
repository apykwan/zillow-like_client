import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import AdCard from '../components/cards/AdCard';
import SearchForm from '../components/forms/SearchForm';

export default function Rent() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetchAds();
    }, []);

    async function fetchAds() {
        try {
            const { data } = await axios.get("/ads-for-rent");
            setAds(data);
        } catch (err) {
            toast.error(err);
        }
    }
    return (
        <>
            <SearchForm />
            <h1 className="display-1 bg-primary text-light p-5">Rent</h1>
            <div className="container">
                <div className="row">
                    {ads?.map(ad => (
                        <AdCard key={ad._id} ad={ad} />
                    ))}
                </div>
            </div>
        </>
    );
}