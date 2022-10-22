import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ISignupPayload, signupHandler } from "../../actions/auth.actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Tooltip from "../../components/tooltip/Tooltip";
import * as yup from 'yup';
import { useFormik } from "formik";
//import photos
import vector from "../../assets/photos/vector-signup.svg";
//import icons
import {
	AiFillEye,
	AiFillEyeInvisible
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { AxiosError } from "axios";
import { IAPIResponseError } from "../../utils/api.util";
/**
 * Signup page
 * @returns JSX.Element
 */
const Signup: FC = () => {
	const dispatch = useAppDispatch();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">("success");


	const { values, errors, handleBlur, isSubmitting, handleSubmit, handleChange, resetForm } = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			cpassword: "",
			acceptedTermsAndConditions: false,
			receiveMarketingEmails: false
		},
		validationSchema: yup.object().shape({
			username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long").lowercase("Username must be lowercase"),
			email: yup.string().email().required(),
			password: yup.string().min(8).required(),
			cpassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required(),
			acceptedTermsAndConditions: yup.boolean().oneOf([true], "You must accept the acceptedTermsAndConditions and conditions").required(),
			receiveMarketingEmails: yup.boolean().oneOf([true, false]).required()
		}),
		onSubmit: async (values: ISignupPayload) => {
			try {
				console.log(values);
				await dispatch(signupHandler(values));
				setTooltipMessage("Your account has been created successfully. Check your email for verification link.");
				setTooltipType("success");
				setCanShowTooltip(true);
				resetForm();
				setTimeout(() => {
					setCanShowTooltip(false);
				}
				, 5000);
			}
			catch (e) {
				const error = e as AxiosError<IAPIResponseError>;
				console.log(error)
				setTooltipMessage("An error occured while trying to signup. Please try again later.");
				setTooltipType("error");
				setCanShowTooltip(true);
				setTimeout(() => {
					setCanShowTooltip(false);
				}, 5000);
			}
		},
	});

	// /**
	//  * This state will contain formData which will be posted to backend
	//  * when user clicks `signup` button
	//  * @constant
	//  * @author aayushchugh
	//  */
	// const [formData, setFormData] = useState<ISignupPayload>({
	// 	username: "",
	// 	email: "",
	// 	password: "",
	// 	cpassword: "",
	// 	acceptedTermsAndConditions: false,
	// 	receiveMarketingEmails: false,
	// });

	// const [error, setError] = useState<string>("");


	// const updateFormData = useUpdateObjectState<ISignupPayload>(setFormData);

	// /**
	//  * This function will be called when form is submitted
	//  * @param e form event
	//  *
	//  * @author aayushchugh
	//  */
	// const submitHandler = async (e: FormEvent) => {
	// 	e.preventDefault();
	// 	try {
	// 		await dispatch(signupHandler(formData));
	// 		navigate(`/verification?email=${formData.email}`);

	// 		// TODO: show success message on UI
	// 	} catch (err) {
	// 		// TODO: show error on UI
	// 	}
	// };

	//show password in input field
	// const passwordVisibility = () => {
	// 	setShowPassword((prev) => !prev);
	// };

	// //show confirm password in input field
	// const confirmPasswordVisibility = () => {
	// 	setShowConfirmPassword((prev) => !prev);
	// };

	/*
	  TODO: Add validation for following fields
	- username
		- [x]required
		- [x]should not be shorter than 3 characters
		- [x]should not be longer than 50 characters
		
	- email
		- [x]required
		- [x]should be a valid email

	- password
		- [x]required
		- [x]minimum length of 6 characters

	- cpassword
		- [x]required
		- [x]minimum length of 6 characters
		- [x]password and cpassword should be same
	-features
		- [x]enter key for submit
		- [x]responsive design
	 */

	return (
		<AnimatePresence>
			<motion.div className="flex flex-col font-poppins justify-center items-center h-screen w-screen no-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
				<div className="flex flex-col bg-[#DBE2EF70] justify-center items rounded-[10px] h-fit w-[80%] p-3 lg:p-3 shadow-lg box-shadow">

					<div className="flex flex-row justify-center">
						<div className="hidden lg:flex w-[50%] justify-center items-center mx-10">
							{/* vector */}
							<img src={vector} alt="vector" className="flex w-[90%] h-[90%]"/>
						</div>
						<div className="hidden lg:flex h-[80%] place-self-center border-r-[3px] rounded-sm border-r-[#3F72AF] opacity-60"/>
						<div className="flex flex-col lg:w-[50%] justify-center items-center lg:ml-10">
							{/* logo */}
							<div className="flex flex-col p-5 w-[90%]">
								<div className="flex flex-col justify-center">
									<form className="flex flex-col">
										{/* username */}
										<div className="flex flex-col my-2">
											<label className="text-[#112D4E] text-sm" htmlFor="username"> Username </label>
											<input
												type="text"
												id="username"
												className={"outline-none border-2 text-[15px] border-white h-full rounded-[10px] p-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.username ? " border-[#FF0000]" : " border-blue-600")}
												placeholder="Enter your username"
												value={values.username}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</div>
										{/* email */}
										<div className="flex flex-col my-2">
											<label className="text-[#112D4E] text-sm" htmlFor="email"> Email </label>
											<input
												type="email"
												id="email"
												className={"outline-none border-2 text-[15px] border-white h-full rounded-[10px] p-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.email ? " border-[#FF0000]" : " border-blue-600")}
												placeholder="Enter your email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</div>
										{/* password */}
										<div className="flex flex-col my-2">
											<label className="text-[#112D4E] text-sm" htmlFor="password"> Password </label>
											<div className="flex flex-row w-full justify-between items-center">
												<input
													type={showPassword ? "text" : "password"}
													id="password"
													className={"outline-none w-[90%] border-2 text-[15px] border-white h-full rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.password ? " border-[#FF0000]" : " border-blue-600")}
														placeholder="Enter your password"
														value={values.password}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													<div
														className="justify-center w-fit items-center text-black hover:bg-[#112D4E60] duration-300 transition-colors cursor-pointer p-2 rounded-full mx-2 mt-2"
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? (
															<AiFillEye className="place-self-center" />
															) : (
															<AiFillEyeInvisible className="place-self-center"  />
														)}
													</div>
												</div>
											</div>
											<div className="flex flex-col my-2">
												<label className="text-[#112D4E] text-sm" htmlFor="confirmPassword"> Confirm Password </label>
											<div className="flex flex-row w-full justify-between items-center">
												<input
													type={showConfirmPassword ? "text" : "password"}
													id="cpassword"
													className={"outline-none w-[90%] border-2 text-[15px] border-white h-full rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.cpassword ? " border-[#FF0000]" : " border-blue-600")}
													placeholder="Confirm your password"
													value={values.cpassword}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<div
													className="justify-center w-fit items-center text-black hover:bg-[#112D4E30] duration-300 transition-colors cursor-pointer p-2 rounded-full mx-2 mt-2"
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												>
													{showConfirmPassword ? (
														<AiFillEye />
														) : (
														<AiFillEyeInvisible />
													)}
												</div>
											</div>
										</div>
										{/* acceptedTermsAndConditions Conditions and Markettings Opt In */}
										<div className="flex flex-col my-3">
											<div className="flex flex-row justify-start items-center">
												<input
													type="checkbox"
													id="acceptedTermsAndConditions"
													className={"flex outline-none w-[18px] h-[18px] border-2 text-[10px] border-[#3F72AF] rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.acceptedTermsAndConditions ? " border-[#FF0000]" : " ")}
													checked={values.acceptedTermsAndConditions}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<label className="flex whitespace-nowrap flex-row mx-2 text-[#112D4E] text-[12px] items-center justify-center mt-2" htmlFor="acceptedTermsAndConditions"> I agree to the <a href="/#" className="flex underline px-1 text-[#3F72AF]">terms and conditions.</a> </label>
											</div>
											<div className="flex flex-row justify-start items-center mt-2">
												<input
													type="checkbox"
													id="receiveMarketingEmails"
													className={"flex outline-none w-[18px] h-[18px] border-2 text-[10px] border-[#3F72AF] rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E20] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.receiveMarketingEmails ? " border-[#FF0000]" : " ")}
													checked={values.receiveMarketingEmails}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<label className="flex mx-2  text-[#112D4E] text-[12px] items-center justify-center mt-2" htmlFor="marketing">I allow Multi Mail to send me marketting email's.</label>
											</div>
										</div>
										{/* submit button */}
										<div className="flex flex-col my-2">
											<button
												type="submit"
												className={"bg-[#5271FF] text-white text-[15px] font-bold py-2 px-4 rounded-[10px] hover:bg-[#112D4E20] duration-300 transition-colors" + (isSubmitting ? " opacity-50 cursor-not-allowed" : "") + (Object.keys(errors).length > 0 ? " opacity-50 cursor-not-allowed" : "")}
												onClick={(e) => {
													e.preventDefault();
													handleSubmit();
												}}
											>
												Sign Up
											</button>
										</div>
										{/* Already have an account */}
										<div className="flex flex-col my-2">
											<p className="text-[#112D4E] text-sm flex flex-col whitespace-nowrap text-center"> Already have an account? <Link className="flex mx-1 justify-center text-[#5271FF] underline" to="/login">Login</Link></p>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* // Note: Cannot include this due to the sheer size of the page.
				<div className="absolute bottom-[15vh] lg:flex p-3 h-fit hover:bg-gray-300 duration-300 rounded-full" onClick={() => {
					navigate(-1);
				}}>
					<AiOutlineArrowLeft className="w-[22px] h-[22px]"/>
				</div> */}
				{/* ToolTip */}
				<AnimatePresence>
					{
						canShowTooltip ? <Tooltip type={tooltipType} message={tooltipMessage} /> : null
					}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
};

export default Signup;
