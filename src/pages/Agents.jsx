import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import UserCard from '../components/cards/UserCard';

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    }, []);

    async function fetchAgents() {
        try {
            const { data } = await axios.get("/agents");
            setAgents(data);
            setLoading(false);
        } catch (err) {
            toast.error(err);
        }
    }
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Agents</h1>
            <div className="container">
                <div className="row">
                    {agents?.map(agent => (
                        <UserCard key={agent._id} user={agent} />
        
                    ))}
                </div>
            </div>
        </div>
    );
}