import * as yup from 'yup';
import { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as queryString from 'query-string';
import mmIcon from "../../assets/logos/icon-transparent.svg";
import verificationVector from "../../assets/photos/vector-verify.svg";
import { AnimatePresence, motion } from "framer-motion";
import Tooltip from '../../components/tooltip/Tooltip';

// Icons
import { HiOutlineKey } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IVerificationPayload, verifyHandler } from '../../actions/auth.actions';
import { AxiosError } from 'axios';
import { IAPIResponseError } from '../../utils/api.util';
import { useAppDispatch } from '../../hooks/useAppDispatch';

/** NOTE: 
 * This page will only be accessible through a link in the signed up email, which will have two parameters:
 * 1. jwt token - (key param) - to get the user's email address and verification status. (via JWT _id payload)
 * 2. verification code - (code param) - to verify the user's email address. ex. 1234
 * 
 * Example URL: /verify?c=<1234>&k=<jwt_token_that_contains_>
 * @author is-it-ayush
 */
const Verification: FC = () => {

	// Convert them all into redux state.
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();


	const parsedParams = queryString.parse(location.search);
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);

	const [token, setToken] = useState<string>("");
	const [canRequestVerification, setCanRequestVerification] = useState<boolean>(false);
	const [isAMinuteOver, setIsAMinuteOver] = useState<boolean>(true);

	const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">("success");


	const onSubmit = async (values: IVerificationPayload, actions: any) => {
		try {
			await dispatch(verifyHandler(values, token));
			setTooltipMessage("Your email has been verified successfully! You can login now.");
			setTooltipType("success");
			setCanShowTooltip(true);
			resetForm();
			setTimeout(() => {
				setCanShowTooltip(false);
				
			}
			, 5000);
		}
		catch (e) {
			const er = e as AxiosError<IAPIResponseError>;
			setTooltipMessage("Something went wrong. Please try again later.");
			setTooltipType("error");
			setCanShowTooltip(true);
			setTimeout(() => {
				setCanShowTooltip(false);
			}, 5000);
		}		
	};

	useEffect(() => {
		// This will run only once when the page is loaded.
		if(!pageLoaded) {
			if(parsedParams.v && parsedParams.t) {
				if(parsedParams.t.length > 0) {
					
					// k (jwt) present --> Make Request --> Validate JWT (on backend) ---> Retrieve status & email --> if verification status is false --> setCanRequestVerification(true);
					// For now, we'll just set it to true.
					setCanRequestVerification(true);
					setToken(String(parsedParams.t));
					if(parsedParams.v.length > 0) {
						values.verificationCode = Number(parsedParams.v);
					}

				}
			}
			setPageLoaded(true);
		}
	}, [pageLoaded]);

	const onResend = () => {
		// Request for a new verification code on user's Email. 
		// This is only accessible if the user's verification status is false (retrieved after the jwt verification request).
		alert("It isn't implemnted yet.");
	};

	const verificationSchema = yup.object().shape({
		verificationCode: yup.number().required("Verification code is required").min(1000, "Verification code must be 4 digits").max(9999, "Verification code must be 4 digits"),
	});

	// We can use formik for form validation and form control.
	const { values, errors, touched, handleBlur, isSubmitting, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: {
			verificationCode: 0,
        },
        validationSchema: verificationSchema,
        onSubmit,
    })

	return (
		<AnimatePresence>
			<motion.div className="flex font-poppins justify-center items-center h-screen w-screen no-select">
				{
					canRequestVerification ? <motion.div className="flex bg-[#DBE2EF] justify-center rounded-[10px] p-3 w-[80%] lg:p-5 shadow-lg box-shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
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
									<h1 className="text-xl font-regular text-[#3F72AF]">Authenticate Your Account</h1>
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
										<label className="text-sm text-[#3F72AF]" htmlFor="verificationCode">Verification Code</label>
										<input
											className={"outline-none border-2 border-white h-full rounded-md p-2 mt-2 transition-colors duration-300 " + (errors.verificationCode && touched.verificationCode ? " border-[#FF0000]" : " border-[#3F72AF]")}
											type="number"
											placeholder="Enter your verification code"
											maxLength={4}
											min={1000}
											max={9999}
											onChange={handleChange}
											id="verificationCode"
											value={values.verificationCode}
											onBlur={handleBlur}
										/>
									</div>
									<div className="flex flex-col mt-5">
										{/* This will hold the button */}
										<button className="text-white rounded-md p-2 w-full cursor-pointer enabled:bg-[#5271FF] disabled:bg-red-500 disabled:cursor-not-allowed duration-500" disabled={
											!values.verificationCode ||
											!!errors.verificationCode
										} type="submit" onClick={() => {
											// Send the verification code to the backend.
											handleSubmit();
										}}>
											Verify
										</button>
									</div>
								</div>
							</div>
							<div className="flex flex-col w-[80%] mt-5">
								{/* This will hold the buttons */}
								<div className="flex flex-col justify-between text-[11px] lg:text-[12px]">
									<p className="mt-3 mx-3 text-center">
										It may take a minute to receive your code. 
									</p>
									{/* Display it after a minute. */}
									<div className={"flex flex-col lg:flex-row justify-center items-center mx-3" + (isAMinuteOver ? "flex" : "hidden")}>
										<h1 className='text-center mx-1'>Haven’t received it yet?</h1> 
										<button className='flex underline italic' onClick={onResend}>Request a new code</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
				: <motion.div className="flex flex-col justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
					<div className="flex flex-col justify-center items-center">
							<div className='flex p-3 flex-row justify-center items-center lg:px-5 drop-shadow-xl w-[80%] lg:w-fit shadow-lg rounded-sm'>
								<div className='px-2'>
									<HiOutlineKey className="h-[28px] w-[28px] text-[#ff5252]"/>
								</div>
								<h1 className='flex justify-center ml-2 items-center text-center'>Where could the key be? Up there? Down Here?</h1>
							</div>
					</div>
				</motion.div>
				}
				<AnimatePresence>
					{
						canShowTooltip ? <Tooltip type={tooltipType} message={tooltipMessage} /> : null
					}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
};


export default Verification;