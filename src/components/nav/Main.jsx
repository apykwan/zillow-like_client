import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcSettings } from "react-icons/fc";
import { AiFillProfile, AiOutlineLogout } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

import { useAuth } from '../../context/auth';
import styles from './css/Main.module.css';

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

    function handlePostAdClick() {
        if(loggedIn) {
            navigate("/ad/create");
        } else {
            navigate("/login");
        }
    }

    return(
        <nav className="nav p-2 d-flex justify-content-between">
            <div className="d-flex flex-row">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                {loggedIn && (<>
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                    <NavLink className="nav-link" to="/ad/create">Post Ad</NavLink>
                </>)}
                
                {!loggedIn && <>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </>}
            </div>
            {loggedIn && (
                <div className="dropdown">
                    <li>
                        <button 
                            className={`${styles['nav-user']} nav-link dropdown-toggle`} 
                            data-bs-toggle="dropdown"
                        >
                            {auth?.user?.name ? auth.user.name : auth.user.username}
                        </button>
                        <ul className="dropdown-menu mt-1">
                            <li>
                                <NavLink className="nav-link" to="/dashboard">
                                    <RxDashboard size="14" /> 
                                    <span className="ml-2">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/user/profile">
                                    <AiFillProfile size="14" /> 
                                    <span className="ml-2">User Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/user/settings">
                                    <FcSettings size="14" /> 
                                    <span className="ml-2">Settings</span>
                                </NavLink>
                            </li>
                            <hr />
                            <li>
                                <a className="nav-link pointer" onClick={logout}>
                                    <AiOutlineLogout size="14" />
                                    <span className="ml-2">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </div>
            )}
        </nav>
    );
}