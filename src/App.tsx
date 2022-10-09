import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Verification from './pages/verification/Verification';
import Nav from './components/nav/Nav';
import NotFound from './pages/not_found/Not_Found';
import { FC } from 'react';
import About from './pages/about/About';
const App: FC = () => {
	return (
		<div>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/verify" element={<Verification />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
