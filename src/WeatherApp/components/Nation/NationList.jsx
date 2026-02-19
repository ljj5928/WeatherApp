import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherByCity,
  fetchDailyWeatherByCity,
} from "../../redux/weatherThunk";

const NationList = ({ cities, nationWeather }) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.ui.isDark);

  return (
    <section className={`nation-list ${isDark ? "dark" : ""}`}>
      <div className="nation-list-header">
        <h3>전국 날씨</h3>
        <p>도시를 클릭하면 메인 날씨가 바뀝니다</p>
      </div>

      <ul className="nation-list-ul">
        {cities.map((city) => {
          const data = nationWeather?.[city.en];
          const icon = data?.weather?.[0]?.icon;
          const temp = data?.main?.temp;

          return (
            <li
              key={city.en}
              className="nation-list-item"
              onClick={() => {
                dispatch(fetchWeatherByCity(city.en));
                dispatch(fetchDailyWeatherByCity(city.en));
              }}
            >
              <div className="left">
                <span className="city">{city.name}</span>
              </div>
              {icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt=""
                />
              )}
              <div className="right">
                <span className="temp">{temp?.toFixed?.(1) ?? "-"}°</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NationList;
