import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/auth';
import styles from './css/AdCreate.module.css';

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

    function navigation(path) {
        return function() {
            navigate(path);
        }
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Ad Create</h1>
            <h3>Sell or lease your properties</h3>

            <div className={`${styles['button-container']} d-flex justify-content-center align-items-center vh-100`}>
                <div className="col-lg-6">
                    <button 
                        className="btn btn-success p-4 w-100"
                        onClick={handleSell}
                    >
                        <span className="h2">Sell</span>
                    </button>
                    {sell && (
                        <div className="my-1">
                            <button 
                                className="btn btn-warning p-4 col-6"
                                onClick={navigation("/ad/create/sell/House")}
                            >
                                House
                            </button>
                            <button 
                                className="btn btn-warning p-4 col-6"
                                onClick={navigation("/ad/create/sell/Land")}
                            >
                                Land
                            </button>
                        </div>
                    )}
                </div>
                <div className="col-lg-6">
                    <button 
                        className="btn btn-success p-4 w-100"
                        onClick={handleRent}
                    >
                        <span className="h2">Rent</span>
                    </button>
                    {rent && (
                        <div className="my-1">
                            <button 
                                className="btn btn-warning p-4 col-6"
                                onClick={navigation("/ad/create/rent/House")}
                            >
                                House
                            </button>
                            <button 
                                className="btn btn-warning p-4 col-6"
                                onClick={navigation("/ad/create/rent/Land")}
                            >
                                Land
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}