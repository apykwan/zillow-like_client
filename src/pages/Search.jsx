import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import SearchForm from '../components/forms/SearchForm';

export default function Search() {

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Search Form</h1>
            <SearchForm />

        </>
    );
}