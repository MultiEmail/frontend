import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/icon-transparent.svg";

/**
 * Nav component
 * @author Kan Halder
 */
const Nav: FC = () => {
	return (
		<div className="font-poppins backdrop-blur-lg w-screen h-[80px] flex justify-between items-center px-4 border-b-2 border-[#DBE2EF] h-[3.5em]">
			{/*logo section*/}
			<Link to="/">
				<div className="flex items-center gap-2">
					<img src={logo} alt="logo" className="w-[60px]" />
					<p className="text-2xl font-regular text-[#F9F7F7]">Multi Email</p>
				</div>
			</Link>
			{/*login & signup section*/}
			<div className="flex gap-3 font-light ">
				<Link to="/signup">
					<button className="bg-[#5271ff] px-4 py-1 rounded-md text-[#F9F7F7]">
						Sign Up
					</button>
				</Link>
				<Link to="/login">
					<button className="bg-[#F9F7F7] text-[#112D4E] px-4 py-1 rounded-md">
						Log In
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Nav;
