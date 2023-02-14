import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/auth';
import styles from './Main.module.css';

export default function Main() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    function logout() {
        setAuth({
            user: null,
            token: '',
            refreshToken: null
        });
        localStorage.removeItem('zl-auth');
        toast.success("Logout successfully");
        navigate("/login");
    }

    const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

    return(
        <nav className="nav p-2 d-flex justify-content-between">
            <div className="d-flex flex-row">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                {!loggedIn && <>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </>}
            </div>
            {loggedIn && <div className="dropdown">
                <li>
                    <button 
                        className={`${styles['nav-user']} nav-link dropdown-toggle`} 
                        data-bs-toggle="dropdown"
                    >
                        {auth?.user?.name ? auth.user.name : auth.user.username}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                            <a 
                                className="nav-link nav-logout"
                                onClick={logout}
                                disabled={auth.user}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </div>}
        </nav>
    );
}