import { FC } from "react";
import sample from "../../assets/photos/product-sample.png";
import { motion } from "framer-motion";

const Home: FC = () => {
	return (
		<motion.div className="w-screen h-screen grid place-items-center font-poppins background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
			<div className="flex flex-col gap-10 items-center">
				<p className="text-white text-4xl">
					Welcome to <span className="text-[#5271ff]">Multi Email</span>
				</p>
				<img src={sample} alt="product-sample" />
			</div>
		</motion.div>
	);
};

export default Home;
