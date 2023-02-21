import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/auth';
import AdCard from '../../components/cards/AdCard';
import styles from './css/Dashboard.module.css';

export default function Dashboard() {
    const [auth, setAuth] = useAuth();
    const [ads, setAds] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const seller = auth.user?.role?.includes("Seller");

    useEffect(function() {
        fetchAds();
    }, []);

    useEffect(function() {
        if(page === 1) return;
        fetchAds();
    }, [page]);

    async function fetchAds() {
        try {
            setLoading(true);
            const { data } = await axios.get(`/user-ads/${page}`);

            setAds(prevState => [ ...prevState, ...data.ads ]);
            setTotal(data.total);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err);
            setLoading(false);
        }
    }

    function pageHandler() {
        setPage(prevState => prevState + 1);
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
            {!seller ? (
                <div className={`${styles['dashboard-buyer']} d-flex justify-content-center align-items-center vh-100`}>
                    <h2>Hey {auth.user?.name ? auth.user.name : auth.user?.username}, welcome to Zillow Like App.</h2>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <p className="text-center mb-3">Total <span className="text-info fw-bold">{total}</span> ads found</p>
                        </div>
                    </div>

                    <div className="row">
                        {ads?.map(ad => (
                            <AdCard key={ad._id} ad={ad} role="Seller" />
                        ))}
                    </div>

                    {ads.length < total && (
                        <div className="row">
                            <div className="col text-center mt-4 mb-4">
                                <button 
                                    className="btn btn-warning"
                                    disabled={loading}
                                    onClick={pageHandler}
                                >
                                    {loading ? "LOADING..." : `${ads?.length} / ${total} LOAD MORE...`}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}