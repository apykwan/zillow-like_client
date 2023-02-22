import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/auth';
import AdCard from '../../components/cards/AdCard';
import styles from './css/Dashboard.module.css';

export default function Wishlist() {
    const [auth, setAuth] = useAuth();
    const [ads, setAds] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(function() {
        fetchAds();
    }, [auth.token !== ""]);

    async function fetchAds() {
        try {
            const { data } = await axios.get(`/wishlist`);
            setAds(data);
            setTotal(data.length);
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Wishlist</h1>
            {!ads.length ? (
                <div className={`${styles['dashboard-buyer']} d-flex justify-content-center align-items-center vh-100`}>
                    <h2>Hey {auth.user?.name ? auth.user.name : auth.user?.username}, You have not liked any property yet</h2>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <p className="text-center mb-3">
                                You have liked <span className="text-info fw-bold">{total}</span> propert{total === 1 ? 'y' : 'ies'}
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        {ads?.map(ad => (
                            <AdCard key={ad._id} ad={ad} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}