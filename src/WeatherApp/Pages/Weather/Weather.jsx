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
  const [recentCities, setRecentCities] = useState(() => {
    try {
      const saved = localStorage.getItem("recentCities");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

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

  /* 검색 api호출 및 검색기록저장 */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city) return getCurrentLocation();

    try {
      await dispatch(fetchWeatherByCity(city)).unwrap();
      await dispatch(fetchDailyWeatherByCity(city)).unwrap();

      const value = city.trim().replace(/\s+/g, " ");
      setRecentCities((prev) => {
        const next = [
          value,
          ...prev.filter((c) => c.toLowerCase() !== value.toLowerCase()),
        ];
        return next.slice(0, 5);
      });
      setCity("");
    } catch (err) {}
  };

  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }, [recentCities]);

  const deleteCity = (idx) => {
    setRecentCities((recentCities) =>
      recentCities.filter((city, index) => index !== idx),
    );
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
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <div className="recent-city">
          {recentCities.length > 0 ? (
            <>
              {recentCities.map((city, idx) => (
                <div className="city-name" key={city}>
                  <span
                    onClick={() => {
                      dispatch(fetchWeatherByCity(city));
                      dispatch(fetchDailyWeatherByCity(city));
                    }}
                  >
                    {city}
                  </span>
                  <button type="button" onClick={() => deleteCity(idx)}>
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="reset-recent"
                onClick={() => {
                  setRecentCities([]);
                  localStorage.removeItem("recentCities");
                }}
              >
                검색 기록 초기화
              </button>
            </>
          ) : (
            <span className="recent-hint">
              최근 검색한 도시가 여기에 표시됩니다
            </span>
          )}
        </div>
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
