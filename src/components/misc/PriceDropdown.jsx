import { useSearch } from '../../context/search';
import { sellPrices, rentPrices } from '../../helpers/priceList';

function Li () {
    const [search, setSearch] = useSearch();
    const action = search.action === "Buy" ? sellPrices : rentPrices;
    return (
        <>
            {action.map(price => (
                <li key={price._id}>
                    <a 
                        className="dropdown-item" 
                        onClick={() => {
                            setSearch({
                                ...search,
                                price: price.name,
                                priceRange: price.array,
                            });
                        }}>
                            {price.name}
                     </a>
                </li>
            ))}
        </>
    );    
}

export default function PriceDropdown() {
    return (
        <>
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    &nbsp; Price range
                </button>
                <ul className="dropdown-menu">
                    <Li />
                </ul>
            </div>
        </>
    );
}