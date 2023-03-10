import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';

import AdFeatures from './AdFeatures';
import { formatNumber, trimAddress } from '../../helpers/util';
import styles from './css/AdCard.module.css';

export default function AdCard({ ad, role="Buyer" }) {
    const navigate = useNavigate();

    function handleNavigate() {
        if(role === "Buyer") navigate(`/ad/${ad.slug}`);
        if(role === "Seller") navigate(`/user/ad/${ad.slug}`);
    }
    return (
        <div className="col-lg-4 p-4 gx-4 gy-4">
            <Badge.Ribbon 
                text={`${ad?.type} for ${ad?.action}`}
                color={`${ad?.action === "Sell" ? "blue" : "red" }`}
            >
                <div 
                    className={`${styles.hoverable} card hoverable shadow`}
                    onClick={handleNavigate}
                >
                    <img 
                        className={styles["ad-card__img"]}
                        src={ad?.photos?.[0].Location} 
                        alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`} 
                    />
                    <div className="card-body">
                        <h3>${formatNumber(ad?.price)}</h3>
                        <p className="card-text">{trimAddress(ad?.address)}</p>
                        <AdFeatures ad={ad} />
                    </div>
                </div>
            </Badge.Ribbon>
        </div>
    );
}