import { FC } from "react";
import sample from "../../assets/photos/product-sample.png";
import logo from "../../assets/logos/icon-transparent.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home: FC = () => {
	return (
		<motion.div className="flex flex-col lg:flex-row w-screen justify-evenly h-screen font-poppins no-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
				<div className="flex flex-col lg:flex-row">
					<div className="lg:hidden flex flex-col justify-center items-center">
						<div className="flex items-center justify-center h-[20vh] w-[20vh]">
							<img src={logo} alt="sample" className="justify-center items-center" />
						</div>
					</div>
					<div className="flex flex-col justify-center items-center">
						<div className="flex flex-col">
							<h1 className="text-[15px] font-light text-[#859BFF]">Hey! This is</h1>
							<h1 className="text-5xl font-semibold text-[#112D4E]">Multi Mail</h1>
							<h1 className="text-[15px] pt-2 font-light">A simple and easy to use multiple</h1>
							<h1 className="text-[15px] font-light">email client.</h1>
							<div className="flex flex-row pt-4">
								<Link to="/signup" className="hover:bg-[#112D4E] hover:text-white text-black duration-300 rounded-md px-4 py-2 font-semibold text-[15px]">Get Started</Link>
								<Link to="/about" className="bg-white text-[#112D4E] rounded-md px-4 py-2 font-semibold text-[15px] ml-4">Learn More</Link>
							</div>
						</div>
					</div>
					<div className="hidden lg:flex flex-col justify-center items-center lg:items-end">
						<div className="flex items-center justify-center lg:justify-end">
							<img src={sample} alt="sample" className="h-[90%] w-[90%]" />
						</div>
					</div>
				</div>
				<div className="absolute bottom-5 left-5 lg:left-10 flex-row justify-center items-center">
					{/* An Open Source Projet  */}
					<div className="flex flex-row justify-center items-center">
						<h1 className="text-[15px] font-light text-[#112D4E]">[ An Open Source Project</h1>
						<Link to="/github" className="text-[15px] font-light text-[#859BFF] ml-2">Github ]</Link>
					</div>
				</div>
		</motion.div>
	);
};

export default Home;
