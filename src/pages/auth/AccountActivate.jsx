import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AccountActivate() {
    const { token } = useParams();

    return (
        <div className="display-1 d-flex justify-content-center align-items-center vh-100">
            Please Wait...
        </div>
    )
}