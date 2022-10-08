import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import mmIcon from "../../assets/logos/icon-transparent.svg";
import verificationVector from "../../assets/photos/vector-verify.svg";
import { motion } from "framer-motion";

/** NOTE: 
 * This page will only be accessible through a link in the signed up email, which will have two parameters:
 * 1. jwt token - (key param) - to get the user's email address and verification status. (via JWT _id payload)
 * 2. verification code - (code param) - to verify the user's email address. ex. 1234
 * @author is-it-ayush
 */
const Verification: FC = () => {

	const [verificationCode, setVerificationCode] = useState<number>();
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);

	useEffect(() => {
		// This will run only once when the page is loaded.
		if(!pageLoaded) {
			// You can use the `useParams` hook here to access the query parameters
			setPageLoaded(true);
		}
	}, [pageLoaded]);

	const verficationCodeOnChange = (e: any) => {
		// Sanitize the input, Parse the input, Update the state.
	}
	const onSubmit = () => {
		// Send the verification code to the backend.
	}

	const onResend = () => {
		// Request for a new verification code on user's Email.
	}



	return (
		<motion.div className="flex font-poppins justify-center items-center h-screen w-screen">
			<div className="flex bg-[#DBE2EF] justify-center rounded-[10px] w-[80%] p-3 lg:p-5 shadow-lg box-shadow">
				<div className="flex flex-row lg:p-5 justify-start lg:justify-center items-center">
					<div className="hidden lg:flex w-[50%] justify-center">
						{/* This will hold the vector */}
						<img className="h-[80%] w-[80%]" src={verificationVector} alt="verification" />
					</div>
					<div className="hidden lg:flex h-full border-r-[3px] rounded-sm border-r-[#3F72AF]"/>
					<div className="flex flex-col lg:w-[50%] justify-center items-center lg:ml-5">
						{/* This will hold the information */}
						<form className="flex flex-col w-full justify-center items-center" onSubmit={onSubmit}>
							<div className="flex flex-row justify-center">
								<img className="h-[48px] w-[48px]" src={mmIcon} alt="checked" />
								<h1 className="text-xl place-self-center mx-2 text-[#112D4E]">Multi Email</h1>
							</div>
							<div className="flex flex-col text-center mt-5">
								<h1 className="text-xl font-semibold text-[#3F72AF]">Authenticate Your Account</h1>
								<p className="text-sm m-3">
									Please confirm your account by entering the verification code sent to your email address.
								</p>
								<div className="flex flex-row justify-center items-center">
									<p className="text-[#5271FF]">{"thisisaniceemail@nice.mail"}</p>
								</div>
							</div>
							<div className="flex flex-col w-[80%] mt-5">
								{/* This will hold the input field */}
								<div className="flex flex-col">
									<label className="text-sm text-[#3F72AF]">Verification Code</label>
									<input
										className="outline-none focus:border-[#3F72AF] border-2 border-white focus:border-2 h-full rounded-md p-2 mt-2 transition-colors duration-300"
										type="number"
										placeholder="Enter your verification code"
										maxLength={4}
										min={1000}
										max={9999}
										onChange={(e) => {
											e.preventDefault();
											verficationCodeOnChange(e);
										}}
										id="verificationCode"
										value={verificationCode}
									/>
								</div>
								<div className="flex flex-col mt-5">
									{/* This will hold the button */}
									<button type="submit" className="bg-[#5271FF] text-white rounded-md p-2 w-full cursor-pointer">
										Verify
									</button>
								</div>
							</div>
						</form>
						<div className="flex flex-col w-[80%] mt-5">
							{/* This will hold the buttons */}
							<div className="flex flex-col justify-between text-[11px] lg:text-[12px]">
								<p className="mt-3 mx-3 text-center">
									It may take a minute to receive your code. Haven’t received it yet?
								</p>
								{/* Display it after a minute. */}
								<button className="underline italic" onClick={onResend}>
									Request a new code
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Verification;
