import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import AdCard from '../components/cards/AdCard';
import SearchForm from '../components/forms/SearchForm';

export default function Buy() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetchAds();
    }, []);

    async function fetchAds() {
        try {
            const { data } = await axios.get("/ads-for-sell");
            setAds(data);
        } catch (err) {
            toast.error(err);
        }
    }
    return (
        <>
            <h1 className="bg-primary p-5">
                <SearchForm />
            </h1>
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