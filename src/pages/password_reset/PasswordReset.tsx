import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tooltip from "../../components/tooltip/Tooltip";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { IResetRequestPayload, IResetPasswordParams, resetRequestHandler, resetPasswordHandler } from "../../actions/auth.actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { IAPIResponseError } from "../../utils/api.util";   

// Icons
import { MdPassword } from "react-icons/md";
import { IoIosHelpBuoy } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const PasswordReset: FC = () => {

    const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [showInitalForm, setShowInitialForm] = useState<boolean>(true);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">("success");


    const onRequestSubmit = async (values: IResetRequestPayload, actions: any) => {
		try {
			await dispatch(resetRequestHandler(values));
			setTooltipMessage("A password reset link has been sent to your email!");
			setTooltipType("success");
			setCanShowTooltip(true);
			setEmail(values.email);
			setShowInitialForm(false);
			setTimeout(() => {
				setCanShowTooltip(false);
			}
			, 3000);
		}
		catch (e) {
			const er = e as AxiosError<IAPIResponseError>;
			const msg = er.response?.data.error ? er.response?.data.error : "Something went wrong! Please try again later.";
			setTooltipMessage(msg);
			setTooltipType("error");
			setCanShowTooltip(true);
			setTimeout(() => {
				setCanShowTooltip(false);
			}, 5000);
		}		
	};

	const onResetSubmit = async (values: IResetPasswordParams, actions: any) => {
		try {
			await dispatch(resetPasswordHandler(values, requestForm.values));
			setTooltipMessage("Success! Your password was reset. Redirecting to login page...");
			setTooltipType("success");
			setCanShowTooltip(true);
			setTimeout(() => {
				setCanShowTooltip(false);
				navigate("/login");
			}
			, 3000);
		}
		catch (e) {
			const er = e as AxiosError<IAPIResponseError>;
			const msg = er.response?.data.error ? er.response?.data.error : "Something went wrong! Please try again later.";
			setTooltipMessage(msg);
			setTooltipType("error");
			setCanShowTooltip(true);
			setTimeout(() => {
				setCanShowTooltip(false);
			}, 5000);
		}
	}

    const resetRequestSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Email is required"),
	});

	const resetPasswordSchema = Yup.object().shape({
		payload: Yup.object().shape({
			password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
			cpassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
		}),
		passwordResetCode: Yup.number().min(1000, "Invalid code").max(9999, "Invalid code").required("Code is required"),
	});


    const requestForm = useFormik({
        initialValues: {
			email: email,
        },
        validationSchema: resetRequestSchema,
        onSubmit: onRequestSubmit,
    })

	const resetForm = useFormik({
		initialValues: {
			payload: {
				password: "",
				cpassword: "",
			},
			passwordResetCode: 0,
		},
		validationSchema: resetPasswordSchema,
		onSubmit: onResetSubmit,
	});


    return (
		<AnimatePresence>
			<motion.div className="flex font-poppins justify-center items-center h-screen w-screen no-select">
				
                <motion.div className="flex bg-[#DBE2EF70] justify-center rounded-[10px] p-3 w-[90%] lg:p-5 shadow-lg box-shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
					<div className="flex flex-row justify-center w-full">
                        <div className="hidden lg:flex w-[50%] justify-center items-center mx-10">
                            <MdPassword className="text-6xl text-[#0e2549]" />
                        </div>
                        <div className="hidden lg:flex h-[80%] place-self-center border-r-[3px] rounded-sm border-r-[#3F72AF] opacity-60"/>
                        <div className="flex flex-col w-[50%] min-w-[300px] justify-center items-center lg:ml-10">
                            <div className="flex flex-col p-5 w-[90%]">
                                <AnimatePresence>
									{
										showInitalForm ? (
											<motion.div className="flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
												<h1 className="text-2xl font-bold text-[#0e2549]">Reset Password</h1>

												<div className="flex flex-col mt-2">
													<p className="text-[#0e2549]">Enter your email address and we'll send you a link to reset your password.</p>
													<div className="flex flex-col mt-2">
														<label className="text-[#112D4E] text-sm" htmlFor="email"> Email </label>
														<input
															type="email"
															id="email"
															className={"outline-none border-2 text-[15px] border-white h-full rounded-[10px] p-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (requestForm.errors.email ? " border-[#FF0000]" : " border-blue-600")}
															placeholder="Enter your email"
															value={requestForm.values.email}
															onChange={requestForm.handleChange}
															onBlur={requestForm.handleBlur}
														/>
													</div>
												</div>
												{/* submit button */}
												<div className="flex flex-col my-2">
													<button
														type="submit"
														className={"bg-[#5271FF] text-white text-[15px] font-bold py-2 mt-3 px-4 rounded-[10px] hover:bg-[#112D4E70] duration-300 transition-colors" + (requestForm.isSubmitting ? " opacity-50 cursor-not-allowed" : "") + (Object.keys(requestForm.errors).length > 0 ? " opacity-50 cursor-not-allowed" : "")}
														onClick={(e) => {
															e.preventDefault();
															requestForm.handleSubmit();
														}}
													>
														Request
													</button>
												</div>
												{/* Already have an account */}
												<div className="flex flex-row my-2 justify-center">
													<p className=" text-sm flex whitespace-nowrap items-center"> Need help?</p>
													{/* <Link className="flex mx-1 justify-center text-[#5271FF] underline" to="/signup">Sign Up</Link> */}
													<IoIosHelpBuoy className="text-[#5271FF] flex text-2xl mx-2 cursor-pointer hover:rotate-90 duration-300 transition-transform" onClick={
														// Render the context menu on that spot
														(e) => {
															e.preventDefault();
															navigate("/support");
														}
													}/>
												</div>
											</motion.div>
										) : (
											<motion.div className="flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
												<h1 className="text-2xl font-bold text-[#0e2549]">Reset Password</h1>
												<div className="flex flex-col">
													<p className="text-[#0e2549]">We have sent you an email with a link to reset your password.</p>
													<div className="flex-col">
														{/* new password */}
														<div className="relative flex flex-col my-2">
															<label className="text-[#112D4E] text-sm" htmlFor="payload.password">New Password </label>
															<div className="flex flex-row justify-between items-center">
																<input
																	type={showPassword ? "text" : "password"}
																	id="payload.password"
																	className={"outline-none border-2 w-full text-[15px] border-white h-full rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (resetForm.errors.payload?.password ? " border-[#FF0000]" : " border-blue-600")}
																		placeholder="Enter your password"
																		value={resetForm.values.payload.password}
																		onChange={resetForm.handleChange}
																		onBlur={resetForm.handleBlur}
																	/>
																	<div
																		className="absolute right-[1%] justify-center w-fit items-center text-black hover:bg-[#112D4E20] duration-300 transition-colors cursor-pointer p-2 rounded-full mx-2 mt-2"
																		onClick={() => {
																			setShowPassword(prev => !prev);
																		}}
																	>
																		{showPassword ? (
																			<AiFillEye className="place-self-center" />
																			) : (
																			<AiFillEyeInvisible className="place-self-center"  />
																		)}
																	</div>
																</div>
														</div>
														{/* confirm new password */}
														<div className="relative flex flex-col my-2">
															<label className="text-[#112D4E] text-sm" htmlFor="payload.cpassword"> Confirm New Password </label>
															<div className="flex flex-row justify-between items-center">
																<input
																	type={showConfirmPassword ? "text" : "password"}
																	id="payload.cpassword"
																	className={"outline-none border-2 w-full text-[15px] border-white h-full rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (resetForm.errors.payload?.cpassword ? " border-[#FF0000]" : " border-blue-600")}
																		placeholder="Confirm your password"
																		value={resetForm.values.payload.cpassword}
																		onChange={resetForm.handleChange}
																		onBlur={resetForm.handleBlur}
																	/>
																	<div
																		className="absolute right-[1%] justify-center w-fit items-center text-black hover:bg-[#112D4E20] duration-300 transition-colors cursor-pointer p-2 rounded-full mx-2 mt-2"
																		onClick={() => {
																			setShowConfirmPassword(prev => !prev);
																		}}
																	>
																		{showConfirmPassword ? (
																			<AiFillEye className="place-self-center" />
																			) : (
																			<AiFillEyeInvisible className="place-self-center"  />
																		)}
																	</div>
																</div>
														</div>
														{/* code */}
														<div className="relative flex flex-col my-2">
															<label className="text-[#112D4E] text-sm" htmlFor="passwordResetCode"> One Time Password </label>
															<div className="flex flex-row justify-between items-center">
																<input
																	type="number"
																	id="passwordResetCode"
																	className={"outline-none border-2 w-full text-[15px] border-white h-full rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (resetForm.errors.passwordResetCode ? " border-[#FF0000]" : " border-blue-600")}
																	placeholder="Reset Code"
																	value={resetForm.values.passwordResetCode}
																	onChange={resetForm.handleChange}
																	onBlur={resetForm.handleBlur}
																/>
															</div>
														</div>
														{/* submit button */}
														<div className="flex flex-col my-2">
															<button
																type="submit"
																className={"bg-[#5271FF] text-white text-[15px] font-bold py-2 mt-3 px-4 rounded-[10px] hover:bg-[#112D4E70] duration-300 transition-colors" + (resetForm.isSubmitting ? " opacity-50 cursor-not-allowed" : "") + (Object.keys(resetForm.errors).length > 0 ? " opacity-50 cursor-not-allowed" : "")}
																onClick={(e) => {
																	e.preventDefault();
																	resetForm.handleSubmit();
																}}
															>
																Update
															</button>
														</div>
													</div>
												</div>
											</motion.div>
										)
									}
								</AnimatePresence>
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

export default PasswordReset;