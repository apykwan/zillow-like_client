import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdSell, MdReceiptLong } from "react-icons/md";
import HTMLRenderer from 'react-html-renderer';

import { useAuth } from '../context/auth';
import MapCard from '../components/cards/MapCard';
import AdFeatures from '../components/cards/AdFeatures';
import AdCard from '../components/cards/AdCard';
import ContactSeller from '../components/forms/ContactSeller';
import ImageGallery from '../components/misc/ImageGallery';
import LikeUnlike from '../components/misc/LikeUnlike';
import { formatNumber } from '../helpers/util';
import defaultPhoto from '../assets/default.jpg';

dayjs.extend(relativeTime);

export default function AdView() {
    const [ad, setAd] = useState({});
    const [related, setRelated] = useState([]);
    const { slug } = useParams();
    const [auth, setAuth] = useAuth();

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
            toast.error('Please refresh the page.');
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
                        <div className="d-flex justify-content-between mb-4">
                            <div>
                                <button className="btn btn-primary btn-lg" disabled>
                                    {ad.type ? ad.type : ''} for {ad.action ? ad.action : ''}
                                </button>

                                <button className={`btn btn-${ad?.sold ? "danger" : "success"} btn-sm mx-3`} disabled>
                                    <span className="mr-1">{ad?.sold ? (<MdReceiptLong />) : (<MdSell />)}</span>
                                    {ad?.sold ? "Off Market" : "In Market"}
                                </button>
                            </div>
                            <LikeUnlike ad={ad} />
                        </div>
                        
                        <h1>{ad?.address}</h1>
                        <button className="btn btn-light btn-sm w-100 p-3 my-3" disabled>
                            <AdFeatures ad={ad} />
                        </button>
                        
                        <h3 className="mt-4 h2">${formatNumber(ad?.price)}</h3>
                        <p className="text-muted">Posted {dayjs(ad?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-lg-8">
                        <ImageGallery photos={photos} />
                    </div>
                </div>
            </div>
            
            <div className="container mb-5">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 mt-3">
                        <MapCard ad={ad} />

                        <br />

                        <h1>{ad?.type} in ${ad?.address} for {ad?.action} ${ad?.price}</h1>
                        <AdFeatures ad={ad} />
                        <hr />
                        <h3 className="fw-bold">{ad?.title}</h3>
                        <HTMLRenderer html={ad?.description?.replaceAll(".",  "<br/><br/>")} />
                        <hr />
                    </div>
                </div>
            </div>

            {auth?.user?._id !== ad?.postedBy?._id && (
                <div className="container">
                    <ContactSeller ad={ad} />
                </div>
            )}
            
            {related.length > 1 ? (
                <div className="container-fluid">
                    <h4 className="text-center">You may also be interested in: </h4>
                    <div className="row">
                        {related?.map(ad => <AdCard key={ad._id} ad={ad} />)}
                    </div>
                </div>
                ) : ""
            }
        </>
    );
}