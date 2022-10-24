import { useNavigate } from 'react-router-dom'
import not_found from '../../assets/photos/not_found.svg'
import { motion } from 'framer-motion'

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <motion.div className="flex flex-col lg:flex-row w-screen justify-center lg:justify-evenly h-screen font-poppins no-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.5,}}>
        <div className="flex flex-col lg:flex-row lg:max-w-[60%]">
          <div className="lg:hidden flex flex-col justify-center items-center">
            <div className="flex items-center justify-center h-[20vh] w-[20vh]">
              <img src={not_found} alt="sample" className="justify-center items-center" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-[90%] text-center lg:text-start items-center lg:items-start lg:w-auto">
              <h1 className="text-4xl font-semibold text-[#112D4E]">Something is missing...</h1>
              <h1 className="text-[15px] mt-2 font-light">We could'nt really find what you're looking for. Maybe try again?</h1>
              <div className="flex flex-row pt-4">
                <button className="text-black px-5 py-2 rounded-md hover:bg-[#5272ff30] duration-200 mx-2 hover:text-black  " onClick={
                  () => {
                    navigate(-1);
                  }
                }>Go Back.</button>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col justify-center items-center">
            <div className="flex items-center justify-center ">
              <img src={not_found} alt="sample" className="h-[90%] w-[90%]" />
            </div>
          </div>
        </div>
        </motion.div>
    )
  }
  
export default NotFound