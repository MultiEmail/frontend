import { FC, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISignupPayload, signupHandler } from "../../actions/auth.actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useUpdateObjectState from "../../hooks/useUpdateObjectState";
//import photos
import vector from "../../assets/photos/vector-signup.svg";
import logo from "../../assets/logos/icon-transparent.svg";
//import icons
import {
  AiOutlineArrowLeft,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
/**
 * Signup page
 * @returns JSX.Element
 */
const Signup: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * This state will contain formData which will be posted to backend
   * when user clicks `signup` button
   * @constant
   * @author aayushchugh
   */
  const [formData, setFormData] = useState<ISignupPayload>({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const updateFormData = useUpdateObjectState<ISignupPayload>(setFormData);

  /**
   * This function will be called when form is submitted
   * @param e form event
   *
   * @author aayushchugh
   */
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signupHandler(formData));
      navigate(`/verification?email=${formData.email}`);

      // TODO: show success message on UI
    } catch (err) {
      // TODO: show error on UI
    }
  };

  //show password in input field
  const passwordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //show confirm password in input field
  const confirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

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
    <div className="absolute top-0 left-0 grid h-screen w-screen place-items-center bg-white font-poppins">
      <div className="relative flex h-auto w-[90vw] max-w-6xl flex-col items-center justify-center gap-4 bg-[#DBE2EF] py-10 md:h-[60vh] md:w-[70vw] md:flex-row md:justify-around">
        {/*icon for redirect to home */}
        <Link to="/" className="absolute top-2 left-2">
          <AiOutlineArrowLeft className="text-xl" />
        </Link>
        {/*logo*/}
        <div className="flex w-fit items-center gap-1 md:hidden">
          <img src={logo} alt="logo" className="w-[50px]" />
          <p className="text-lg">Multi Email</p>
        </div>
        {/*image section */}
        <div className="flex h-[30vh] w-[70%] max-w-sm items-center md:w-[50%]">
          <img src={vector} alt="vector" />
        </div>
        {/*separate line*/}
        <div className="h-[1px] w-[95%] rounded-full border-2 border-[#3f71af60] bg-[#6398da60] md:h-[30vh] md:w-[0px]"></div>
        <form className="flex w-[90%] flex-col items-center gap-3 md:w-[40%]" onSubmit={submitHandler}>
		{/*form section */}
          {/*logo*/}
          <div className="hidden w-fit items-center gap-1 md:flex">
            <img src={logo} alt="logo" className="w-[40px]" />
            <p>Multi Email</p>
          </div>
          <div className="flex w-[90%] flex-col gap-2 text-[#3F72AF]">
            <label className="text-[14px]" htmlFor="username">
              Username:{" "}
            </label>
            <input
              id="username"
              type="text"
              placeholder="multiemail"
              className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
              value={formData.username}
              onChange={(e) => updateFormData("username", e.target.value)}
            />
          </div>
          <div className="flex w-[90%] flex-col gap-2 text-[#3F72AF]">
            <label className="text-[14px]" htmlFor="email">
              Email:{" "}
            </label>
            <input
              id="email"
              type="email"
              placeholder="info@multiemail.us"
              className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
            />
          </div>
          <div className="relative flex w-[90%] flex-col gap-2 text-[#3F72AF]">
            <label className="text-[14px]" htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="strongpassword"
              className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute right-2 top-[65%] cursor-pointer"
                onClick={passwordVisibility}
              />
            ) : (
              <AiFillEye
                className="absolute right-2 top-[65%] cursor-pointer"
                onClick={passwordVisibility}
              />
            )}
          </div>
          <div className="relative flex w-[90%] flex-col gap-2 text-[#3F72AF]">
            <label className="text-[14px]" htmlFor="cpassword">
              Confirm Password:{" "}
            </label>
            <input
              id="cpassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm your password"
              className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
              value={formData.cpassword}
              onChange={(e) => updateFormData("cpassword", e.target.value)}
            />
            {showConfirmPassword ? (
              <AiFillEyeInvisible
                className="absolute right-2 top-[65%] cursor-pointer"
                onClick={confirmPasswordVisibility}
              />
            ) : (
              <AiFillEye
                className="absolute right-2 top-[65%] cursor-pointer"
                onClick={confirmPasswordVisibility}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-[12px]">
              I agree with the{" "}
              <span className="text-[#5271ff] underline">term of services</span>
            </label>
          </div>
          <button
            type="submit"
            className="rounded bg-primary py-1 px-2 text-white"
          >
            Signup
          </button>
          <p className="text-[12px]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#5271ff] underline cursor-pointer">
              Log In
            </Link>{" "}
            here
          </p>
		</form>
      </div>
    </div>
  );
};

export default Signup;
