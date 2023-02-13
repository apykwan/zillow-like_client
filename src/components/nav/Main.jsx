import { NavLink } from 'react-router-dom';

import styles from './Main.module.css';

export default function Main() {
    return(
        <nav className="nav p-2 d-flex justify-content-between">
            <div className="d-flex flex-row">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </div>
            <div className="dropdown">
                <li>
                    <button className={`${styles['nav-user']} nav-link dropdown-toggle`} data-bs-toggle="dropdown">User</button>
                    <ul className="dropdown-menu">
                        <li>
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                            <a href="/login" className="nav-link">Logout</a>
                        </li>
                    </ul>
                </li>
            </div>
        </nav>
    );
}