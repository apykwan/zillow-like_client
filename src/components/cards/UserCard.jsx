import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Badge } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HiOfficeBuilding } from "react-icons/hi";
import { MdLocationOn, MdPhone } from "react-icons/md";

import { formatPhoneNumber } from '../../helpers/util';
import userDefaultImg from '../../assets/default_user.jpg'; 
import styles from './css/UserCard.module.css';

dayjs.extend(relativeTime);

export default function UserCard ({ user }) {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    function handleNavigate() {
        navigate(`/agent/${user.username}`);
    }

    async function fetchAdCount() {
        try {
            const { data } = await axios.get(`/agent-ad-count/${user._id}`);

            setCount(data.length);
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    useEffect(function() {
        if(user?._id) fetchAdCount();
    }, [user?._id]);
    return (
        <div className="col-lg-4 p-4 gx-4 gy-4">
            <Badge.Ribbon 
                text={`${count} listings`}
                color="darkgreen"
            >
                <div 
                    className={`${styles.hoverable} card hoverable shadow`}
                    onClick={handleNavigate}
                >
                    <img 
                        className={styles["user-card__img"]}
                        src={user?.photo?.Location ?? userDefaultImg} 
                        alt={user.username} 
                    />
                    <div className="card-body">
                        <h3>{user?.username ?? user?.name}</h3>
                        <hr />
                        <h5 className="card-text p-1"><HiOfficeBuilding size="16" /> {user.company}</h5>
                        <h5 className="card-text p-1"><MdLocationOn size="16" /> {user.address}</h5>
                        <h5 className="card-text p-1"><MdPhone size="16" /> {formatPhoneNumber(user.phone)}</h5>
                        <small className="text-muted ml-auto">Joined {dayjs(user.createdAt).fromNow()}</small>
                    </div>
                </div>
            </Badge.Ribbon>
        </div>
    );
}