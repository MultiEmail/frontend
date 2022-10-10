import { Link } from 'react-router-dom'
import not_found from '../../assets/photos/not_found.svg'
const NotFound = () => {
    return (
      <div className=' flex-col justify-center items-center h-screen absolute top-0 left-0 grid h-screen w-screen place-items-center bg-white font-poppins '>
        <img src={not_found} alt="" className='w-2/4'/>
        <p className='text-4xl my-3 text-[#5271FF] font-light'>404 Page Not Found</p>
        <p className='mb-3 text-1xl'>-- try using a new url --</p>
        <Link to="/">
            <button className="bg-[#5271ff] px-3 py-1 rounded-md text-white">
            <p className='py-2.5 px-2 font-light'>Back Home</p>
            </button>
        </Link>
      </div>
    )
  }
  
export default NotFound