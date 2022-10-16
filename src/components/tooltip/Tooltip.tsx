import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";

const ToolTip: FC<ITooltipProps> = ({ message, type }) => {
    const [tooltipMessage, setTooltipMessage] = useState<string>("You're not supposed to see this.");
    const [tooltipType, setTooltipType] = useState<"error" | "success" | "warning" | "info">("info");

    // Icon Map with corresponding colors
    const iconMapWithColors = {
        error: <AiOutlineCloseCircle className="text-red-600" />,
        success: <AiOutlineCheckCircle className="text-green-600" />,
        warning: <AiOutlineWarning className="text-yellow-600" />,
        info: <AiOutlineInfoCircle className="text-blue-600" />
    };

    useEffect(() => {
        setTooltipMessage(message);
        setTooltipType(type);
    }, [message, type]);

    return (
        <motion.div
            className="absolute bottom-5 font-poppins"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition= {{ duration: 0.3 }}
        >
            <div className="flex flex-row p-2 justify-start items-center w-fit shadow-xl rounded-[10px]">
                <div className="flex px-2">
                    {iconMapWithColors[tooltipType]}
                </div>
                <h1 className="flex pr-2">{tooltipMessage}</h1>
            </div>
        </motion.div>
    );
}

interface ITooltipProps {
    message: string;
    type: "error" | "success" | "warning" | "info";
}

export default ToolTip;