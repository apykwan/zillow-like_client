import { NavLink } from 'react-router-dom';


export default function Sidebar() {
    return (
        <>
           <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/ad/create">Post Ad</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/user/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/user/settings">Settings</NavLink>
                </li>
            </ul>
        </>
    );
}