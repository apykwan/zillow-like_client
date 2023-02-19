import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useAuth } from '../../context/auth';

export default function LikeUnlike({ ad }) {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    async function handleLike () {
        try {
            if(auth.user === null) {
                toast.error("Please login first.");
                navigate("/login", {
                    state: `/ad/${ad.slug}`
                });
                return;
            }

            if(ad?.sold) {
                toast.error("This property is sold and no longer available.");
                return;
            }

            const { data } = await axios.post('/wishlist', { adId: ad._id});
            setAuth({ ...auth, user: data });
            toast.success("You liked this ad.");

            const fromLS = JSON.parse(localStorage.getItem("zl-auth"));
            fromLS.user = data;
            localStorage.setItem('zl-auth', JSON.stringify(fromLS));
        } catch (err) { 
            console.log(err);
        }
    }

    async function handleUnlike () {
        try {
            if(auth.user === null) {
                toast.error("Please login first.");
                navigate("/login");
                return;
            }

            const { data } = await axios.delete(`/wishlist/${ad._id}`);
            setAuth({ ...auth, user: data });
            toast.success("You unliked this ad.");

            const fromLS = JSON.parse(localStorage.getItem("zl-auth"));
            fromLS.user = data;
            localStorage.setItem('zl-auth', JSON.stringify(fromLS));
        } catch (err) { 
            console.log(err);
        }
    }

    return (
        <>
            <span className="h2 mt-2 pointer">
                {auth.user?.wishlist?.includes(ad?._id) 
                    ? (<FcLike onClick={handleUnlike} />) 
                    : (<FcLikePlaceholder onClick={handleLike} />)
                }
            </span>
        </>
    );
}