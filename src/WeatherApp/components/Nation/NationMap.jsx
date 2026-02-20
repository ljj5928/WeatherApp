import {
  fetchWeatherByCity,
  fetchDailyWeatherByCity,
} from "../../redux/weatherThunk";
import { useDispatch, useSelector } from "react-redux";
import { formatTemp } from "../../util/temperature";
import NationSkeleton from "./NationSkeleton";

const NationMap = ({ cities, loading, nationWeather, unit }) => {
  const isDark = useSelector((state) => state.ui.isDark);

  const dispatch = useDispatch();

  if (loading) return <NationSkeleton isDark={isDark} />;

  return (
    <div className={`nation ${isDark ? "dark" : ""}`}>
      <h3>전국 날씨</h3>
      {cities.map((city) => {
        const data = nationWeather[city.en];

        return (
          <div
            key={city.en}
            className={`nation-item ${city.className}`}
            onClick={() => {
              dispatch(fetchWeatherByCity(city.en));
              dispatch(fetchDailyWeatherByCity(city.en));
            }}
          >
            <img
              src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
              width="40"
            />
            <div>
              <span>{city.name}</span>
              <span> {formatTemp(data?.main?.temp,unit)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NationMap;
