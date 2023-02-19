import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAPS_KEY } from '../../config';
import styles from './MapCard.module.css';

export default function MapCard({ ad }) {
    const defaultProps = {
        center: {
            lng: ad?.location?.coordinates[0],
            lat: ad?.location?.coordinates[1]
        },
        zoom: 11
    };

    if (ad?.location?.coordinates?.length > 0) return (
        <div className={`${styles['map-card']}`}>
            <GoogleMapReact 
                bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <div lat={ad?.location?.coordinates[1]} lng={ad?.location?.coordinates[0]}>
                    <span className="lead">📍</span>
                </div>
            </GoogleMapReact>
        </div>
    );
}