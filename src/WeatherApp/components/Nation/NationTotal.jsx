import React, { useEffect, useState } from "react";
import NationMap from "./NationMap";
import NationList from "./NationList";
import axios from "axios";
import './Nation.css'

const NationTotal = () => {
  const APIkey = "abaa4bc6ae221a9e82b86c4cfb336282";
  const [loading, setLoading] = useState(true);
  const [nationWeather, setNationWeather] = useState({});

  const cities = [
    { name: "서울", en: "seoul", className: "seoul" },
    { name: "부산", en: "busan", className: "busan" },
    { name: "대구", en: "daegu", className: "daegu" },
    { name: "대전", en: "daejeon", className: "daejeon" },
    { name: "광주", en: "gwangju", className: "gwangju" },
    { name: "제주", en: "jeju", className: "jeju" },
    { name: "원주", en: "wonju", className: "wonju" },
  ];

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const requests = cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.en}&appid=${APIkey}&units=metric`,
        ),
      );

      const responses = await Promise.all(requests);

      const result = {};
      responses.forEach((res, idx) => {
        result[cities[idx].en] = res.data;
      });

      setNationWeather(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <div className="nation-map-only">
        <NationMap cities={cities}  loading={loading} nationWeather={nationWeather}/>
      </div>
      <div className="nation-list-only">
        <NationList cities={cities} nationWeather={nationWeather} />
      </div>
    </>
  );
};

export default NationTotal;
