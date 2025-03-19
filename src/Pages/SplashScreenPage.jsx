import React from "react";
import logo from "../assets/Buytown logo 1.png";
import "../Styles/SplashScreen/SplashScreen.css";
import { Link } from "react-router-dom";
const SplashScreenPage = () => {
  return (
    <>
     <Link to={'/register'}><div className="container">
      <img src={logo} alt="" />
    </div></Link>
    </>
   
  );
};

export default SplashScreenPage;
