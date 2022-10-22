
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Icons
import { MdPassword } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TbBrandDiscord } from "react-icons/tb";

const Support: FC = () => {

    const navigate = useNavigate();
    const [pageLoad, setPageLoad] = useState<boolean>(true);
    const [externals, setExternals] = useState<any>({});

    useEffect(() => {
      if(pageLoad) {

        // Run Once; Fetch Discord Link from .env (TOOD: Write a handler later)
        const discordLink = process.env.REACT_APP_DISCORD_LINK || "https://discord.gg/GtSftczQX5";
        const documentationLink = process.env.REACT_APP_MULTIEMAIL_DOCS_LINK || "https://docs.multiemail.us";
        const passwordRequsetLink = process.env.REACT_APP_PASSWORD_RESET_LINK || "https://multiemail.us/password-reset/request";
        setExternals({
            ...externals,
            discord: discordLink,
            documentation: documentationLink
        });
        setPageLoad(false);
      }
    }, [pageLoad])
    


    return (
        <motion.div className="h-screen w-screen font-poppins flex justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnimatePresence>
                <div className="flex flex-col w-[80%]">
                    <motion.div className="flex flex-col lg:flex-row justify-evenly items-center text-black transition-opacity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        
                        <div className="flex flex-row justify-center items-center p-5 rounded-[5px] min-h-[130px] max-w-[350px] m-2 hover:bg-[#5272ff30] duration-500 cursor-pointer opacity-80 hover:opacity-100" onClick={
                            () => {
                                navigate("/support/password/reset");
                            }
                        }>
                            <div>
                                <MdPassword className="text-4xl mx-5" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold ">Password?</h1>
                                <p className="text-sm">Did you forget your password? Request a reset link.</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center p-5 rounded-[5px] min-h-[130px] max-w-[350px] m-2 hover:bg-[#5272ff30] duration-500 cursor-pointer opacity-80 hover:opacity-100" onClick={
                            () => {
                                if(externals.documentation) {
                                    window.open(externals.documentation, "_blank");
                                } else {
                                        console.log("[Config] The configuration is not setup poperly. Viist 'placehoder link' for more information.");
                                }
                                }
                        }>
                            <div>
                                <HiOutlineDocumentDuplicate className="text-4xl mx-5" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold ">Documentation?</h1>
                                <p className="text-sm">We wrote a simple guide for you!</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center p-5 rounded-[5px] min-h-[130px] max-w-[350px] m-2 hover:bg-[#5272ff30] duration-500 cursor-pointer opacity-80 hover:opacity-100" onClick={
                            () => {
                                if(externals.discord) {
                                    window.open(externals.discord, "_blank");
                                } else {
                                        console.log("[Config] The configuration is not setup poperly. Viist 'placehoder link' for more information.");
                                }
                            }
                        }>
                            <div>
                                <TbBrandDiscord className="text-4xl mx-5" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold ">Discord?</h1>
                                <p className="text-sm">Need extra help? Join our discord.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence>
        </motion.div>
    );
}

export default Support;