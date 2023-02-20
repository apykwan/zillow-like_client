import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdView from './pages/AdView';
import AccountActivate from './pages/auth/AccountActivate';
import ForgotPassword from './pages/auth/ForgotPassword';
import AccessAccount from './pages/auth/AccessAccount';
import Dashboard from './pages/user/Dashboard';
import AdCreate from './pages/user/ad/AdCreate';
import Main from './components/nav/Main';
import Footer from './components/nav/Footer';
import PrivateRoute from './components/routes/PrivateRoute';
import SellHouse from './pages/user/ad/SellHouse';
import SellLand from './pages/user/ad/SellLand';
import RentHouse from './pages/user/ad/RentHouse';
import RentLand from './pages/user/ad/RentLand';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Main />
				<Toaster />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/ad/:slug" element={<AdView />} />
					<Route path="/auth/account-activate/:token" element={<AccountActivate />} />
					<Route path="/auth/forgot-password" element={<ForgotPassword />} />
					<Route path="/auth/access-account/:token" element={<AccessAccount />} />
					<Route path="/" element={<PrivateRoute />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="ad/create" element={<AdCreate />} />
						<Route path="ad/create/Sell/House" element={<SellHouse />} />
						<Route path="ad/create/Sell/Land" element={<SellLand />} />
						<Route path="ad/create/Rent/House" element={<RentHouse />} />
						<Route path="ad/create/Rent/Land" element={<RentLand />} />
						<Route path="/user/:slug" element={<Profile />} />
						<Route path="/user/settings" element={<Settings />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</BrowserRouter>
	);
}