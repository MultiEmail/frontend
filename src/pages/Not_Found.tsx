import { Link } from 'react-router-dom'
import not_found from '../assets/photos/not_found.png'
import './Not_Found.css'
const NotFound = () => {
    return (
      <div id="not_found_div">
        <img src={not_found} alt="" id="not_found_image"/>
        <p id="not_found_text">404 Page Not Found</p>
        <p id="not_found_subtext">-- try using a new url --</p>
        <Link to="/">
            <button className="bg-[#5271ff] px-3 py-1 rounded-md text-white">
            <p id="not_found_buttontext">Back Home</p>
            </button>
        </Link>
      </div>
    )
  }
  
export default NotFound