import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AccountActivate from './pages/auth/AccountActivate';
import ForgotPassword from './pages/auth/ForgotPassword';
import AccessAccount from './pages/auth/AccessAccount';
import Main from './components/nav/Main';
import { AuthProvider } from './context/auth';

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
					<Route path="/auth/account-activate/:token" element={<AccountActivate />} />
					<Route path="/auth/forgot-password" element={<ForgotPassword />} />
					<Route path="/auth/access-account/:token" element={<AccessAccount />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}