import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/auth';
import Sidebar from '../../../components/nav/Sidebar';
import styles from './AdCreate.module.css';

export default function AdCreate() {
    const [sell, setSell] = useState(true);
    const [rent, setRent] = useState(false);
    const navigate = useNavigate();

    function handleSell() {
        setSell(true);
        setRent(false);
    }

    function handleRent() {
        setRent(true);
        setSell(false);
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Ad Create</h1>
            <Sidebar />

            <div className={`${styles['button-container']} d-flex justify-content-center align-items-center vh-100`}>
                <div className="col-lg-6">
                    <button 
                        className="btn btn-success p-4 w-100"
                        onClick={handleSell}
                    >
                        Sell
                    </button>
                    {sell && 'show sell house or land option'}
                </div>
                <div className="col-lg-6">
                    <button 
                        className="btn btn-info p-4 w-100"
                        onClick={handleRent}
                    >
                        Rent
                    </button>
                    {rent && 'show rent house or land option'}
                </div>
            </div>
        </div>
    );
}