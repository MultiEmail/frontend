import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tooltip from "../../components/tooltip/Tooltip";

import mmIcon from "../../assets/logos/icon-transparent.svg";
import verificationVector from "../../assets/photos/vector-verify.svg";

const PasswordResetRequest: FC = () => {

    

    const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">("success");

    return (
		<AnimatePresence>
			<motion.div className="flex font-poppins justify-center items-center h-screen w-screen no-select">
				
					<motion.div className="flex bg-[#DBE2EF] justify-center rounded-[10px] p-3 w-[80%] lg:p-5 shadow-lg box-shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
					<div className="flex flex-row lg:p-5 justify-start w-[90%] lg:justify-between items-center">
						<div className="hidden lg:flex w-[50%] justify-center">
							{/* This will hold the vector */}
							<img className="h-[70%] w-[70%]" src={verificationVector} alt="verification" />
						</div>
						<div className="hidden lg:flex h-full border-r-[3px] rounded-sm border-r-[#3F72AF] opacity-60"/>
						<div className="flex flex-col lg:w-[50%] justify-center items-center lg:ml-10">
							{/* This will hold the information */}
							<div className="flex flex-col w-full justify-center items-center">
								<div className="flex flex-row justify-center">
									<img className="h-[48px] w-[48px]" src={mmIcon} alt="checked" />
									<h1 className="text-xl place-self-center mx-2 text-[#112D4E]">Multi Email</h1>
								</div>
								<div className="flex flex-col text-center mt-5">
									<h1 className="text-xl font-regular text-[#3F72AF]">Request Reset</h1>
								</div>
								<div className="flex flex-col text-center mt-5">
                                    <label className="text-[#3F72AF] font-semibold">Email</label>
                                    <input className="w-[90%] lg:w-[70%] h-[40px] rounded-[10px] border-[#3F72AF] border-2 mt-2 px-2" type="email" placeholder="Enter your email" />
                                </div>
							</div>
							<div className="flex flex-col w-[80%] mt-5">
								{/* This will hold the buttons */}
								<div className="flex flex-col justify-between text-[11px] lg:text-[12px]">
									<p className="mt-3 mx-3 text-center">
										We request you to check your spam folder too.
									</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
				<AnimatePresence>
					{
						canShowTooltip ? <Tooltip type={tooltipType} message={tooltipMessage} /> : null
					}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
}

export default PasswordResetRequest;