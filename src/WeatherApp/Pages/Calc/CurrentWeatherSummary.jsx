import { useSelector } from "react-redux";

const CurrentWeatherSummary = () => {
  const currentWeather = useSelector((state) => state.weather.current);

  if (!currentWeather) return null;

  return (
    <div className="current-summary">
      <h3>현재 날씨</h3>
      <div className="summary-text">
        <span className="name">{currentWeather.name}</span>
        <div className="summary-info">
        <span className="temperature">기온 {currentWeather?.main?.temp?.toFixed(1)}°</span>
        <span className="humid">습도 {currentWeather?.main?.humidity}%</span>
        <span className="speed">풍속 {currentWeather?.wind?.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherSummary;