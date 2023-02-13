import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Main from './components/nav/Main';
import { AuthProvider } from './context/auth';

function App() {

  return (
    <BrowserRouter>
		<AuthProvider>
			<Main />
			<Toaster />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</AuthProvider>
    </BrowserRouter>
  );
}

export default App;
