/* router */
import { Link, NavLink } from "react-router-dom";
/* redux */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherByLocation,
  fetchDailyWeatherByLocation,
  fetchWeatherByCity,
  fetchDailyWeatherByCity,
} from "../../redux/weatherThunk";
import { setDark } from "../../redux/uiSlice";
/* fontawesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
/* cssw */
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.ui.isDark);
  const handleGoHome = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      dispatch(fetchWeatherByLocation({ lat, lon }));
      dispatch(fetchDailyWeatherByLocation({ lat, lon }));
      (error) => {
        console.error(error);
        dispatch(fetchWeatherByCity("Daegu"));
        dispatch(fetchDailyWeatherByCity("Daegu"));
      };
    });
  };
  return (
    <header>
      <div className="header-i">
        <div className="header-menu">
          <h2>
            <Link to={"/"} onClick={() => handleGoHome()}>
              {isDark ? (
                <img src="./logo_dark.png" alt="메인로고" className="logo" />
              ) : (
                <img src="./logo.png" alt="다크모드메인로고" className="logo" />
              )}
            </Link>
          </h2>
          <div className={`darkmode-btn ${isDark ? "dark" : ""}`}>
            <button
              type="button"
              className={!isDark ? "active" : ""}
              onClick={() => dispatch(setDark(false))}
            >
              <FontAwesomeIcon icon={faSun} />
            </button>
            <button
              type="button"
              className={isDark ? "active" : ""}
              onClick={() => dispatch(setDark(true))}
            >
              <FontAwesomeIcon icon={faMoon} />
            </button>
          </div>
        </div>
        <div className="gnb">
          <NavLink to="/">오늘의 날씨</NavLink>

          <NavLink to="/news">뉴스속보</NavLink>

          <NavLink to="/calc">기상 계산기</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
