import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/logos/full-transparent.png';

//Icons 
import { FiMail, FiGithub } from 'react-icons/fi';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { CgSortAz } from 'react-icons/cg';
import { BiTimeFive } from 'react-icons/bi';
import { MdDesignServices } from 'react-icons/md';

const About: FC = () => {

	const navigate = useNavigate();
	const [allowRot, setAllowRot] = useState(false);

	

	const mail = [
		'work@company.com',
		'school@school.edu',
		'personal@me.com',
	];

	window.addEventListener('scroll', () => {
		if (window.scrollY / window.innerHeight > 0.5) {
			setAllowRot(true);
		}
		else {
			setAllowRot(false);
		}
		
	});

	return (
		<motion.div className="flex flex-col no-scroll-x overflow-x-hidden justify-center lg:justify-evenly font-poppins no-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
			<div className="flex flex-col lg:flex-row h-screen items-center justify-center " id='section1'>
				<div className="flex flex-col justify-center items-center w-[90%] lg:w-auto">
					<div className="flex flex-col">
						{
							Array.from({length: 3}, (_, i) => (
								<h1 key={i} className="text-4xl font-semibold text-[#112D4E]">Let's began with the problem.</h1>
							))
						}
						<p className="text-[15px] mt-2 font-light max-w-fit">In our live's, we often have different mail account's on different services such as our personal email, our work, our school etc.</p>
					</div>
				</div>
				<div className="hidden lg:flex flex-col justify-center items-center ml-10">
					<div className='flex flex-col '>
						{
							mail.map((x, i) => (
								<div key={i} className="flex my-3 flex-row min-w-[250px] justify-between items-end text-[#112D4E] px-5 py-2 rounded-md hover:bg-[#5272ff30] duration-200 mx-2 hover:text-black  ">
									<h1 className="text-[15px] font-semibold">{x}</h1>
									<FiMail className="text-2xl" />
								</div>
							))
						}
					</div>
				</div>
				<div className={"lg:hidden fixed bottom-[5vh] p-3 h-fit  duration-300 rounded-full backdrop-blur-[2px] ".concat(allowRot ? 'rotate-180' : '')} onClick={() => {
					// Check the current position of the page and scroll to the next section if not at the bottom
					if (window.scrollY < window.innerHeight) {
						window.scrollTo({
							top: window.innerHeight,
							behavior: 'smooth',
						});
					}
					else {
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						});
					}
				}}>
					<AiOutlineArrowDown className='w-[16px] h-[16px]' />
				</div>
			</div>
			<div className="flex flex-col lg:flex-row h-screen items-center justify-center " id='section2'>
				<div className='flex flex-col lg:flex-row'>
					<div className='flex flex-col mx-5'>
						<div className='dashed-border w-[250px] h-[100px] flex flex-row justify-evenly items-center my-5 hover:bg-green-100  duration-200'>
							<CgSortAz className="text-4xl text-[#112D4E]"/>
							<h1 className="text-[#112D4E] text-2xl font-semibold">Organized</h1>
						</div>
						<div className='dashed-border w-[250px] h-[100px] flex flex-row justify-evenly items-center my-5 hover:bg-blue-100  duration-200'>
							<BiTimeFive className="text-3xl text-[#112D4E]"/>
							<h1 className="text-[#112D4E] text-2xl font-semibold">Save's Time</h1>
						</div>
					</div>
					<div className='flex flex-col mx-5'>
						<div className='dashed-border w-[250px] h-[100px] flex flex-row justify-evenly items-center my-5 hover:bg-red-100  duration-200'>
							<MdDesignServices className="text-4xl text-[#112D4E]"/>
							<h1 className="text-[#112D4E] text-2xl font-semibold">Customize</h1>
						</div>
						<div className='dashed-border w-[250px] h-[100px] flex flex-row justify-evenly items-center my-5 hover:bg-yellow-100  duration-200'>
							<FiGithub className="text-4xl text-[#112D4E]"/>
							<h1 className="text-[#112D4E] text-2xl font-semibold">Open Source</h1>
						</div>
					</div>
				</div>
				<div className='flex flex-col p-5'>
					<h1 className="text-4xl font-semibold text-[#112D4E] text-center lg:text-end">So, Multi Email?</h1>
					<p className="text-[15px] mt-2 font-light max-w-auto lg:max-w-[300px] text-center lg:text-end">Multi Email is a web app that allows you to manage all your email accounts in one place. It organizes your emails and offers ton of customization's.</p>
				</div>
			</div>
        </motion.div>
		// <div className="py-16 bg-white">
		// 	<div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
		// 		<div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
		// 			<div className="md:5/12 lg:w-5/12">
		// 				<img
		// 					src={img}
		// 					alt="image"
		// 					loading="lazy"
		// 					width=""
		// 					height=""
		// 				/>
		// 			</div>
		// 			<div className="md:7/12 lg:w-6/12">
		// 				<h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
		// 					Multi Email development team is carried out by
		// 					passionate developers
		// 				</h2>
		// 				<p className="mt-6 text-gray-600">
		// 					Project to manage multiple emails at once with lots
		// 					of customization. You can send and receive emails.
		// 					Desktop notifications can be modified. I also want
		// 					to eventually make a mobile version of this app so
		// 					that the desktop and mobile versions can
		// 					communicate.
		// 				</p>
		// 				<p className="mt-4 text-gray-600">
		// 					{' '}
		// 					Later on we will also make it a vscode extention, so
		// 					if you spent a lot of time in vscode that's the
		// 					extention you want.
		// 				</p>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default About;
