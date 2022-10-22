import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import photos
import vector from "../../assets/photos/vector-login.svg";

//import icons
import {
	AiOutlineArrowLeft,
	AiFillEye,
	AiFillEyeInvisible
} from "react-icons/ai";
import { IoIosHelpBuoy } from "react-icons/io";
import { ILoginPayload, loginHandler } from "../../actions/auth.actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AnimatePresence, motion } from "framer-motion";
import Tooltip from "../../components/tooltip/Tooltip";
import { IAPIResponseError } from "../../utils/api.util";
import { AxiosError } from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">("success");


	const onSubmit = async (values: ILoginPayload, actions: any) => {
		try {
			await dispatch(loginHandler(values));
			setTooltipMessage("You have been logged in successfully!");
			setTooltipType("success");
			setCanShowTooltip(true);
			resetForm();
			setTimeout(() => {
				setCanShowTooltip(false);
				
				// Navigate to the dashboard.
			}
			, 5000);
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

	/**
	 * This state will contain formData which will be posted to backend
	 * when user clicks `login` button
	 * @constant
	 * @author aayushchugh
	 */

  // const [formData, setFormData] = useState<ILoginPayload>({
	// 	email: "",
	// 	password: "",
	// });

	// /**
	//  * Weather password should be visible or not
	//  * @constant
	//  * @author KanLSK
	//  */
	const [showPassword, setShowPassword] = useState<boolean>(false);

	// const updateFormData = useUpdateObjectState<ILoginPayload>(setFormData);

	/**
	 * This function will change the password visibility
	 * @author KanLSK
	 */
	const passwordVisibility = () => {
		setShowPassword(prev => !prev);
	};

	// /**
	//  * This function will run on form submit and will dispatch a action for login
	//  * @param e Form Event
	//  *
	//  * @author aayushchugh
	//  */
	// const submitHandler = async (e: FormEvent) => {
	// 	e.preventDefault();

	// 	try {
	// 		await dispatch(loginHandler(formData));
	// 		navigate("/");
	// 		// TODO: show feedback on UI
	// 	} catch (err) {
	// 		// TODO: show feedback on UI
	// 	}
	// };


	const loginSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const { values, errors, handleBlur, isSubmitting, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: {
			email: "",
			password: "",
        },
        validationSchema: loginSchema,
        onSubmit,
    })



	return (
		<AnimatePresence>
			<motion.div className="flex flex-col font-poppins justify-center items-center h-screen w-screen no-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
				<div className="flex flex-col bg-[#DBE2EF70] justify-center rounded-[10px] h-fit w-[80%] p-3 lg:p-3 shadow-lg box-shadow">
					<div className="flex flex-row justify-center">
						<div className="hidden lg:flex w-[50%] justify-center items-center mx-10">
							{/* vector */}
							<img src={vector} alt="vector" className="flex w-[90%] h-[90%]"/>
						</div>
						<div className="hidden lg:flex h-[80%] place-self-center border-r-[3px] rounded-sm border-r-[#3F72AF] opacity-60"/>
						<div className="flex flex-col w-[50%] min-w-[300px] justify-center items-center lg:ml-10">
							{/* logo */}
							<div className="flex flex-col p-5 w-[90%]">
								<div className="flex flex-col justify-center">
									<form className="flex flex-col">
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
										<div className="relative flex flex-col my-2">
											<label className="text-[#112D4E] text-sm" htmlFor="password"> Password </label>
											<div className="flex flex-row justify-between items-center">
												<input
													type={showPassword ? "text" : "password"}
													id="password"
													className={"outline-none border-2 w-full text-[15px] border-white h-full rounded-[10px] p-1 px-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" + (errors.password ? " border-[#FF0000]" : " border-blue-600")}
														placeholder="Enter your password"
														value={values.password}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													<div
														className="absolute right-[1%] justify-center w-fit items-center text-black hover:bg-[#112D4E20] duration-300 transition-colors cursor-pointer p-2 rounded-full mx-2 mt-2"
														onClick={() => passwordVisibility()}
													>
														{showPassword ? (
															<AiFillEye className="place-self-center" />
															) : (
															<AiFillEyeInvisible className="place-self-center"  />
														)}
													</div>
												</div>
										</div>
										{/* submit button */}
										<div className="flex flex-col my-2">
											<button
												type="submit"
												className={"bg-[#5271FF] text-white text-[15px] font-bold py-2 mt-3 px-4 rounded-[10px] hover:bg-[#112D4E70] duration-300 transition-colors" + (isSubmitting ? " opacity-50 cursor-not-allowed" : "") + (Object.keys(errors).length > 0 ? " opacity-50 cursor-not-allowed" : "")}
												onClick={(e) => {
													e.preventDefault();
													handleSubmit();
												}}
											>
												Log In
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
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*icon for redirect to home */}
				<div className="absolute bottom-[15vh] lg:flex p-3 h-fit hover:bg-gray-300 duration-300 rounded-full" onClick={() => {
					navigate(-1);
				}}>
					<AiOutlineArrowLeft className="w-[22px] h-[22px]"/>
				</div>
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

export default Login;

