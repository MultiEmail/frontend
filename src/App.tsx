import { BrowserRouter, Routes, Route } from "react-router-dom";

//import pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Verification from "./pages/verification/Verification";
import Nav from "./components/nav/Nav";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/verify" element={<Verification />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
