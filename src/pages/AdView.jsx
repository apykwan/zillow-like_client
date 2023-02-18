import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import AdFeatures from '../components/cards/AdFeatures';
import ImageGallery from '../components/misc/ImageGallery';
import defaultPhoto from '../assets/default.jpg';

export default function AdView() {
    const [ad, setAd] = useState({});
    const [related, setRelated] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        if(slug) fetchAd();
    }, [slug]);

    async function fetchAd() {
        try {
            const { data } = await axios.get(`/ad/${slug}`);
     
            setAd(data?.ad);
            setRelated(data?.related);
        } catch (err) {
            console.log(err);
            toast.error('Fail to fetch the data. Please refresh the page');
        }
    }

    function generatePhotoArray(photos) {
        const arr = [];
        if(photos?.length > 0) {
            const width = photos?.length === 1 ? 2 : 4;
        
            photos.forEach(function(photo) {
                arr.push({
                    src: photo.Location,
                    width,
                    height: width
                });
            });
            return arr;
        }
        return arr[{
            src: defaultPhoto,
            width: 2,
            height: 1
        }];
    }

    const photos = ad?.photos && generatePhotoArray(ad?.photos);
    
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-lg-4">
                        <div className="mb-4">
                            <button className="btn btn-primary btn-lg" disabled>
                                {ad.type ? ad.type : ''} for {ad.action ? ad.action : ''}
                            </button>

                            <button className={`btn btn-${ad?.sold ? "danger" : "success"} btn-sm mx-3`} disabled>
                                {ad?.sold ? "Off Market" : "In Market"}
                            </button>
                        </div>
                        <h1>{ad?.address}</h1>
                        <AdFeatures ad={ad} />
                    </div>
                    <div className="col-lg-8">
                        <ImageGallery photos={photos} />
                    </div>
                </div>
            </div>
            
            <pre>{JSON.stringify({ad, related}, null, 4)}</pre>
        </>
    );
}