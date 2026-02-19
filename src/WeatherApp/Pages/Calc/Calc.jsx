import React from "react";
import CurrentWeatherSummary from "./CurrentWeatherSummary";
import Temp from "./Temp";
import FeelTemp from "./FeelTemp";
import Thi from "./Thi";
import './Calc.css'

const Calc = () => {
    
  return (
   <div className="calc">
    <CurrentWeatherSummary />
    <Temp/>
    <FeelTemp/>
    <Thi/>
   </div>
  );
};

export default Calc;
