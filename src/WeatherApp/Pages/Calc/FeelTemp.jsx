import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import {useSelector} from 'react-redux'

const FeelTemp = () => {
  const [tem, setTem] = useState(0);
  const [humid, setHumid] = useState(0);
  const [wind, setWind] = useState(0);
  const currentWeather = useSelector((state) => state.weather.current || {});

  const inputCurrentInfo = () => {
    setTem(currentWeather?.main?.temp || 0)
    setHumid(currentWeather?.main?.humidity || 0)
    setWind(currentWeather?.wind?.speed || 0)
  }

  return (
    <div className="feel-temp">
      <h3>체감온도 계산기</h3>
      <div className="feel-con">
        <div className="feel-input">
          <div>
            <label htmlFor="temp">기온</label>
            <br />
            <input
              type="number"
              id="temp"
              value={tem}
              onChange={(e) => setTem(e.target.value)}
            />
            <span>°</span>
          </div>
          <div>
            <label htmlFor="humidity">습도</label>
            <br />
            <input
              type="number"
              id="humidity"
              value={humid}
              onChange={(e) => setHumid(e.target.value)}
            />
            <span>%</span>
          </div>
          <div>
            <label htmlFor="wind-speed">풍속</label>
            <br />
            <input
              type="number"
              id="wind-speed"
              value={wind}
              onChange={(e) => setWind(e.target.value)}
            />
            <span>m/s</span>
          </div>
        </div>
        <FontAwesomeIcon icon={faRightLong} className="arrow" />
        <div>
          <label htmlFor="feeling">체감 온도</label>
          <br />
          <input
            type="number"
            id="feeling"
            value={(tem + ((0.33 * humid) / 100) * 6 - 0.7 * wind - 4).toFixed(1)}
            readOnly
          />
          <span>°</span>
        </div>
      </div>
        <button type="button" onClick={inputCurrentInfo}>현재 날씨 불러오기</button>
    </div>
  );
};

export default FeelTemp;
