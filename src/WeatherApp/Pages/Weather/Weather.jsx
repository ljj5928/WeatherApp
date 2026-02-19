import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherByLocation,
  fetchDailyWeatherByLocation,
  fetchWeatherByCity,
  fetchDailyWeatherByCity,
} from "../../redux/weatherThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faTemperatureEmpty,
  faWind,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { setDark } from "../../redux/uiSlice";
import WeatherByHour from "./WeatherByHour";
import WeatherByWeekly from "./WeatherByWeekly";
import WeatherSkeleton from "./WeatherSkeleton";
import "./Weather.css";

const Weather = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const currentWeather = useSelector((state) => state.weather.current || {});
  const dailyWeather = Object.values(
    useSelector((state) => state.weather.daily || {}),
  );
  const isDark = useSelector((state) => state.ui.isDark);
  const { status, error } = useSelector((state) => state.weather);

  /* api 호출 */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      dispatch(fetchWeatherByLocation({ lat, lon }));
      dispatch(fetchDailyWeatherByLocation({ lat, lon }));
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return getCurrentLocation();
    dispatch(fetchWeatherByCity(city));
    dispatch(fetchDailyWeatherByCity(city));
    setCity("");
  };

  /* 없는 도시 검색시  */
  useEffect(() => {
    if (status === "error" && error === "NOT_FOUND") {
      alert("도시명을 정확히 입력해주세요.");

      // 현재 위치로 복귀
      getCurrentLocation();
    }
  }, [status, error]);

  /* 다크 모드 활성 조건*/
  useEffect(() => {
    if (!currentWeather?.timezone) return;

    const nowUTC = Date.now() + new Date().getTimezoneOffset() * 60000;

    const cityDate = new Date(nowUTC + currentWeather.timezone * 1000);

    const hour = cityDate.getHours();

    dispatch(setDark(hour >= 18 || hour < 6));
  }, [currentWeather]);

  /* skeleton */
  if (status === "loading" || !currentWeather) {
    return <WeatherSkeleton isDark={isDark} />;
  }

  return (
    <div className={`weather ${isDark ? "dark" : ""}`}>
      <div className="weather-main">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="도시를 입력해주세요"
            value={city}
            onChange={(e) =>
              setCity(e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ""))
            }
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <div className="main-con">
          <span>{currentWeather?.name}</span>
          <div className="weather-icon">
            {
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather?.weather?.[0]?.icon}@2x.png`}
                width={"150px"}
              />
            }
            <span className="main-temp">
              {currentWeather?.main?.temp?.toFixed(1)}°
            </span>
          </div>
          <div className="weather-info">
            <span>
              체감 온도:{currentWeather?.main?.feels_like?.toFixed(1)}°
              <FontAwesomeIcon icon={faTemperatureEmpty} />
            </span>
            <span>
              습도:{currentWeather?.main?.humidity}%
              <FontAwesomeIcon icon={faDroplet} />
            </span>
            <span>
              풍속:
              {currentWeather?.wind?.speed.toFixed(1)}m/s
              <FontAwesomeIcon icon={faWind} />
            </span>
          </div>
        </div>
      </div>
      <WeatherByHour
        dailyWeather={dailyWeather}
        timezone={currentWeather?.timezone}
      />
      <WeatherByWeekly dailyWeather={dailyWeather} />
    </div>
  );
};

export default Weather;
