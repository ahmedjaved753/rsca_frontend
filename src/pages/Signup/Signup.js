import React from "react";
import DataVisualizationSVG from "../../components/DataVisualizationSVG/DataVisualizationSVG";
import RscaLogo from "../../components/RscaLogo/RscaLogo";
import SignupForm from "../../components/SignupForm/SignupForm";
import Footer from "../../components/Footer/Footer";
import "./signup.css";
function Signup() {
  return (
    <div className="signup-container">
      <RscaLogo />
      <DataVisualizationSVG />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default Signup;
