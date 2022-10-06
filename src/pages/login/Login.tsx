import { FC, useState } from "react";
import { Link } from "react-router-dom";

//import photos
import vector from "../../assets/photos/vector-login.svg";
import logo from "../../assets/logos/icon-transparent.svg";

//import icons
import {
  AiOutlineArrowLeft,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //for submit by clicking an enter key
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (email === "" || password === "") {
        return;
      } else {
        console.log({
          Email: email,
          Password: password,
        });
      }
    }
  };

  const passwordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="absolute top-0 left-0 grid h-screen w-screen place-items-center bg-white font-poppins ">
      <div className="relative flex h-auto w-[90vw] max-w-6xl flex-col items-center justify-center gap-4 bg-[#DBE2EF] py-10 md:h-[60vh] md:w-[70vw] md:flex-row md:justify-around">
        {/*icon for redirect to home */}
        <Link to="/" className="absolute top-2 left-2">
          <AiOutlineArrowLeft className="text-xl" />
        </Link>
        {/*logo*/}
        <div className="md:hidden w-fit items-center gap-1 flex">
          <img src={logo} alt="logo" className="w-[50px]" />
          <p className="text-lg">Multi Email</p>
        </div>
        {/*image section */}
        <div className="flex h-[30vh] w-[90%] items-center md:w-[50%] max-w-sm">
          <img src={vector} alt="vector"/>
        </div>
        {/*separate line*/}
        <div className="h-[1px] w-[95%] rounded-full border-2 border-[#3f71af60] bg-[#6398da60] md:h-[30vh] md:w-[0px]"></div>
        {/*form section */}
        <div className="flex w-[90%] flex-col items-center gap-3 md:w-[40%] mt-2 md:mt-0">
          {/*logo*/}
          <div className="hidden w-fit items-center gap-1 md:flex">
            <img src={logo} alt="logo" className="w-[40px]" />
            <p>Multi Email</p>
          </div>
          {/*form*/}
          <div className="flex w-[90%] flex-col gap-2 text-[#3F72AF]">
            <label className="text-[14px]">Email</label>
            <input
              type="email"
              onKeyPress={handleKeyPress}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
              placeholder="example@multiemail.us"
            />
          </div>
          <div className="relative flex w-[90%] flex-col gap-2 text-[#3F72AF]">
            <label className="text-[14px]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
              placeholder="password"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute right-2 top-[60%]"
                onClick={passwordVisibility}
              />
            ) : (
              <AiFillEye
                className="absolute right-2 top-[60%]"
                onClick={passwordVisibility}
              />
            )}
          </div>
          <button className="rounded-md bg-[#5271ff] px-2 py-1 text-[14px] text-white">
            Log In
          </button>
          <p className="text-[12px]">
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-[#5271ff] underline">
              Sign Up
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
