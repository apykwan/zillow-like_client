import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function NotFound() {
    const navigate = useNavigate();
    useEffect(function() {
        toast.success("Will be redirect to main page");
        
        const interval = setInterval(function() {
            navigate("/");
        }, 3000);

        return function () {
            clearInterval(interval);
        }
    }, []);
    return(
        <div className="display-1 text-center p-5">404 PAGE NOT FOUND!</div>
    );
}