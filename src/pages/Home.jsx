import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useSearch } from '../context/search';
import AdCard from '../components/cards/AdCard';
import SearchForm from '../components/forms/SearchForm';

export default function Home() {
    const [search, setSearch] = useSearch();
    const [adsForSell, setAdsForSell] = useState();

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const { data } = await axios.get("/ads");
            setAdsForSell(data.adsForSell);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1 className="cover p-5">
                <SearchForm />
            </h1>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center p-5">
                        {search.results?.length > 0 ? `Found ${search.results?.length} results` : 'no Properties found.'}
                    </div>
                </div>
                
                {search?.results?.length < 1 ? (
                    <div className="row">
                        {adsForSell?.map((ad) => (
                            <AdCard ad={ad} key={ad._id} />
                        ))}
                    </div>
                ) : (
                    <div className="row">
                    {search.results?.map(item => (
                        <AdCard ad={item} key={item._id} />
                    ))}
                </div>
                )}
                

                
            </div>
        </>
    );
}