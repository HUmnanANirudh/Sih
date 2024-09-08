import facebook from "/src/assets/facebook.png";
import insta from "/src/assets/insta_logo.png";
import twitter from "/src/assets/twitter_logo.png";
import indpost from "/src/assets/india post logo.png";
import Azadilogo from "/src/assets/Azadilogo.png";
import assets from "../assets/assets";
import SignUp from "../pages/SignUp";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="flex justify-end bg-teal-500 text-right text-white pb-2">
        <div className="justify-around mr-3">
          <span className="mr-3" to="/">
            Home
          </span>
          <span className="mr-3" to="/">
            About Us
          </span>
        </div>
        <span className="flex justify-end mr-3" to="/">
          <img className="h-6 pr-3" srcSet={assets.facebook} />
          <img className="h-6 pr-3" srcSet={assets.insta} />
          <img className="h-6 pr-3" srcSet={assets.twitter} />
        </span>
        {/* <span className="mr-3" to="/"></span>
        <span className="mr-3" to="/"></span> */}
      </div>
      <div className="flex bg-white justify-between">
        <div className="flex">
          <span className="ml-3">
            <img className="h-14" srcSet={assets.indpost} />
          </span>
          <span className="ml-3 text-orange-300 ">
            Ministry of Communications
            <br />
            Department of Posts
          </span>
        </div>
        <div className="justify-end">
          <img className="h-14 mr-3" srcSet={assets.Azadilogo} />
        </div>
      </div>
      <div className="flex-row  bg-teal-500 text-right text-white">
        <button
           onClick={() => navigate('/signup')}
          className="rounded-lg p-1 px-5 text-white"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
