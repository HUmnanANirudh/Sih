import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const Homepage = () => {
  return (
    <div>
        <img className="object-cover h-99 w-full" srcSet={assets.bg} />
        <img className="object-cover h-99 w-full" srcSet={assets.About} />
        <img className="object-cover h-99 w-full" srcSet={assets.Last}/>
      </div>
  )
};

export default Homepage;
