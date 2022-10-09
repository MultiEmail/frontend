import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/icon-transparent.svg";
import { useLocation } from "react-router-dom";
/**
 * Nav component
 * @author Kan Halder
 */
const Nav: FC = () => {

	const location = useLocation();
	
	// This is a hacky way to get the current route.
	// I'm not sure if there's a better way to do this.
	const currentRoute = location.pathname.split("/")[1];
	console.log(`Current route: ${currentRoute}`);


	return (
		<div className="absolute flex flex-row font-poppins w-screen justify-between items-center px-4 h-[60px] backdrop-blur-lg shadow-lg no-select">
			{/*logo section*/}
			<Link to="/">
				<div className="flex flex-row items-center mx-2">
					<img src={logo} alt="logo" className="w-[60px]" />
					<p className={"text-xl " + (currentRoute.length > 0 ? " text-black" : "text-white" )}>Multi Email</p>
				</div>
			</Link>
			{/*login & signup section*/}
			<div className="flex gap-3">
				<Link to="/signup">
					<button className="bg-[#5271ff] px-4 py-1 rounded-md text-white ">
						Sign Up
					</button>
				</Link>
				<Link to="/login">
					<button className="bg-white text-black px-4 py-1 rounded-md">
						Log In
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Nav;
