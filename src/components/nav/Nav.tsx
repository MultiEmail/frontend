import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/icon-transparent.svg";

/**
 * Nav component
 * @author Kan Halder
 */
const Nav: FC = () => {
	return (
		<div className="font-poppins backdrop-blur-lg w-screen flex justify-between items-center px-4 border-b-2 border-gray-400 h-[3.5em]">
			{/*logo section*/}
			<Link to="/">
				<div className="flex items-center gap-2">
					<img src={logo} alt="logo" className="w-[60px]" />
					<p className="text-2xl text-white">Multi Email</p>
				</div>
			</Link>
			{/*login & signup section*/}
			<div className="flex gap-3">
				<Link to="/signup">
					<button className="bg-[#5271ff] px-3 py-1 rounded-md text-white">
						Sign Up
					</button>
				</Link>
				<Link to="/login">
					<button className="bg-[#DBE2EF] text-black px-4 py-1 rounded-md">
						Log In
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Nav;
