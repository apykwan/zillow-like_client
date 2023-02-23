import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import PriceDropdown from '../misc/PriceDropdown';
import { GOOGLE_PLACES_KEY } from '../../config';
import { useSearch } from '../../context/search';

export default function SearchForm() {
    const [search, setSearch] = useSearch();

    function buyBtn() {
        setSearch(prevState => {
            // reset to all price if action changes
            if(prevState.action === "Rent") {
                return {
                    ...prevState,
                    action: "Buy",
                    price: "All price",
                    priceRange: [0, 10000000]
                };
            }
            return {
                ...prevState,
                action: "Buy"
            };
        });
    }

    function rentBtn() {
        setSearch(prevState => {
            // reset to all price if action changes
            if(prevState.action === "Buy") {
                return {
                    ...prevState,
                    action: "Rent",
                    price: "All price",
                    priceRange: [0, 10000]
                };
            }
            return {
                ...prevState,
                action: "Rent"
            };
        });
    }

    function houseBtn() {
        setSearch(prevState => ({
            ...prevState,
            type: "House"
        }));
    }

    function landBtn() {
        setSearch(prevState => ({
            ...prevState,
            type: "Land"
        }));
    }

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12 form-control">
                        <GooglePlacesAutocomplete 
                            apiKey={GOOGLE_PLACES_KEY} 
                            apiOptions="us"
                            selectProps={{ 
                                defaultInputValue: search?.address,
                                placeholder: "Search for address..",
                                onChange: function ({ value }) {
                                    setSearch({
                                        ...search, 
                                        address: value.description 
                                    });
                                }
                            }} 
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary col-lg-2 square" onClick={buyBtn}>
                        {search.action === "Buy" ? "✅ Buy" : "Buy"}
                    </button>
                    <button className="btn btn-primary col-lg-2 square" onClick={rentBtn}>
                        {search.action === "Rent" ? "✅ Rent" : "Rent"}
                    </button>
                    <button className="btn btn-primary col-lg-2 square" onClick={houseBtn}>
                        {search.type === "House" ? "✅ House" : "House"}
                    </button>
                    <button className="btn btn-primary col-lg-2 square" onClick={landBtn}>
                        {search.type === "Land" ? "✅ Land" : "Land"}
                    </button>
                    <PriceDropdown search={search} setSearch={setSearch} />
                    <button className="btn btn-danger col-lg-2 square">Search</button>
                </div>
            </div>

            <pre>{JSON.stringify(search, null, 4)}</pre>
        </>
    );
}