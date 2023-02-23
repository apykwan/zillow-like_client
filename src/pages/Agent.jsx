import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserCard from '../components/cards/UserCard';
import AdCard from '../components/cards/AdCard';

export default function Agent() {
    const [agent, setAgent] = useState(null);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    async function fetchAgent() {
        try {
            const { data } = await axios.get(`/agent/${params.username}`);
            setAgent(data.agent);
            setAds(data.ads);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(function() {
        if(params?.username) fetchAgent();
    }, [])

    if(loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="display-1">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">
                {agent?.name ?? agent?.username}
            </h1>

            <div className="container">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <UserCard user={agent} />
                    <div className="col-lg-4"></div>
                </div>
            </div>

            <h2 className="text-center m-5">Recent Listing</h2>
            <div className="row">
                {ads?.map(function(ad) {
                    return <AdCard ad={ad} key={ad._id} />
                })}
            </div>
        </div>
    )
}