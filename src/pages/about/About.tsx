import { FC } from "react";
import img from "../../assets/logos/full-transparent.svg";

const About: FC = () => {
	return (
		<div className="py-16 bg-white font-poppins">
			<div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
				<div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
					<div className="md:5/12 lg:w-5/12 flex flex-col items-center">
						<img
							src={img}
							alt="background"
							loading="lazy"
							width=""
							height=""
						/>
					</div>
					<div className="md:7/12 lg:w-6/12">
						<h2 className="text-2xl text-[#112D4E] font-regular md:text-4xl">
							Multi Email development team is carried out by
							passionate developers
						</h2>
						<p className=" mt-6 font-light text-[#3F72AF]">
							Project to manage multiple emails at once with lots
							of customization. You can send and receive emails.
							Desktop notifications can be modified. I also want
							to eventually make a mobile version of this app so
							that the desktop and mobile versions can
							communicate.
						</p>
						<p className="mt-4 text-[#3F72AF]">
							{" "}
							Later on we will also make it a vscode extention, so
							if you spent a lot of time in vscode that's the
							extention you want.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
