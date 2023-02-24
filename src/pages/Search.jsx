import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useSearch } from '../context/search';
import AdCard from '../components/cards/AdCard';
import SearchForm from '../components/forms/SearchForm';

export default function Search() {
    const [search, setSearch] = useSearch();
    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Search Form</h1>
            <SearchForm />

            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center p-5">
                        {search.results?.length > 0 ? `Found ${search.results?.length} results` : 'no Properties found.'}
                    </div>
                </div>
                
                <div className="row">
                    {search.results?.map(item => (
                        <AdCard ad={item} key={item._id} />
                    ))}
                </div>
            </div>
        </>
    );
}