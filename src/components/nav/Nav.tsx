import { FC, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/icon-transparent.svg";
import { useLocation } from "react-router-dom";

import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

/**
 * Nav component
 * @author Kan Halder
 */
const Nav: FC = () => {

	const location = useLocation();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggle = () => setIsOpen(!isOpen)

	
	// This is a hacky way to get the current route.
	// I'm not sure if there's a better way to do this.
	const currentRoute = location.pathname.split("/")[1];


	return (
        <div className='absolute top-0 w-screen h-[60px] font-poppins backdrop-blur-lg z-999'>
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className='flex flex-row items-center'>
					<img src={logo} alt="logo" className="w-[48px] h-[48px]" />
                    <Link to="/" className={'text-xl mr-4 md:text-4 font-semibold'}>Multi Email</Link>
                </div>
                <ul className={"hidden md:flex" }>
                    <Link className={"flex p-2 m-3 duration-300 transition-border " + (currentRoute === "about" ? "border-t-2 border-[#5272ff60]" : null)} to="/about"><li>About</li></Link>
                    <Link className={"flex p-2 m-3 duration-300 transition-border " + (currentRoute === "github" ? "border-t-2 border-[#5272ff60]" : null)} to="/github"><li>Github</li></Link>
                    <Link className={"flex p-2 m-3 duration-300 transition-border " + (currentRoute === "team" ? "border-t-2 border-[#5272ff60]" : null)} to="/team"><li>Team</li></Link>
                    <Link className={"flex p-2 m-3 duration-300 transition-border " + (currentRoute === "support" ? "border-t-2 border-[#5272ff60]" : null)} to="/support"><li>Support</li></Link>
				</ul>
				<div className={"hidden md:flex"}>
					<Link to="/signup" className="text-black px-4 py-2 rounded-md hover:bg-[#5272ff30] duration-200 mx-2 hover:text-black">Sign Up</Link>
					<Link to="/login" className="text-black px-4 py-2 rounded-md hover:bg-[#5272ff30] duration-200 mx-2 hover:text-black">Log In</Link>
				</div>
                <div className='md:hidden' onClick={toggle}>
                    {isOpen ? <IoClose className="w-[28px] h-[28px]" /> : <HiMenuAlt3 className="w-[28px] h-[28px]" />}
                </div>
            </div>
            
            {/* Mobile Navbar, Side Menu is hidden so no need for update */}
            <div className={!isOpen ? 'hidden' : 'z-998 absolute w-full px-8 bg-white' }>
                <ul>
					<Link to="/about"><li className={"border-b-2 w-full py-3 text-lg duration-300 " + (currentRoute === "about" ? " border-[#5272ff60]" : null)}>About</li></Link>
					<Link to="/github"><li className={"border-b-2 w-full py-3 text-lg duration-300 " + (currentRoute === "github" ? " border-[#5272ff60]" : null)}>Github</li></Link>
					<Link to="/team"><li className={"border-b-2 w-full py-3 text-lg duration-300 " + (currentRoute === "team" ? " border-[#5272ff60]" : null)}>Team</li></Link>
					<Link to="/support"><li className={"border-b-2 w-full py-3 text-lg duration-300 " + (currentRoute === "support" ? " border-[#5272ff60]" : null)}>Support</li></Link>
				</ul>
				<div className="flex flex-col w-full">
					<Link to="/signup" className="text-black px-4 py-2 rounded-md hover:bg-[#5272ff30] duration-200 mx-2 hover:text-black font-semibold text-center my-4">Sign Up</Link>
					<Link to="/login" className="text-black px-4 py-2 rounded-md hover:bg-[#5272ff30] duration-200 mx-2 hover:text-black font-semibold text-center my-4">Log In</Link>
				</div>
			</div>
      </div>
	);
};

export default Nav;
