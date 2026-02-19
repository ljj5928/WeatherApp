import React from "react";
import Header from "./components/Header/Header";
import NationTotal from "./components/Nation/NationTotal";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Weather from "./Pages/Weather/Weather";
import News from "./Pages/News/News";
import Calc from "./Pages/Calc/Calc";
import "./App.css";
import "./bg.css";

const App = () => {
  const isDark = useSelector((state) => state.ui.isDark);
  const currentWeather = useSelector((state) => state.weather.current);
  const location = useLocation();
  const pageClass = location.pathname.replace("/", "") || "home";



  const weatherMain = currentWeather?.weather?.[0]?.main;

  const weatherBgClass = (() => {
    switch (weatherMain) {
      case "Rain":
      case "Drizzle":
        return "bg-rain";
      case "Snow":
        return "bg-snow";
      case "Thunderstorm":
        return "bg-thunder";
      case "Clouds":
        return "bg-clouds";
      case "Clear":
        return "bg-clear";
      case "Haze":
      case "Mist":
        return "bg-haze";
      default:
        return "bg-default";
    }
  })();
  return (
    <>
      <div className={`bg ${isDark ? "dark" : ""} ${weatherBgClass}`}></div>
      <div className={`app ${isDark ? "dark" : ""} page-${pageClass}`}>
        <Header />
        <div className="contents">
          <div className="contents-i">
            <Routes>
              <Route path="/" element={<Weather />} />
              <Route path="/news" element={<News />} />
              <Route path="/calc" element={<Calc />} />
            </Routes>
            <NationTotal />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
