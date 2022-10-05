import { FC } from "react";
import sample from "../../assets/photos/product-sample.png";

const Home: FC = () => {
	return (
		<div className="w-screen h-screen grid place-items-center font-poppins">
			<div className="background"></div>
			<div className="flex flex-col gap-10 items-center">
				<p className="text-white text-4xl">
					Welcome to <span className="text-[#5271ff]">Multi Email</span>
				</p>
				<img src={sample} alt="product-sample" />
			</div>
		</div>
	);
};

export default Home;
