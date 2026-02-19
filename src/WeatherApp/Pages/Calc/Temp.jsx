import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import {useSelector} from 'react-redux'

const Temp = () => {
  const [cel, setCel] = useState(0);
  const fahrenheit = (cel * 9) / 5 + 32;
  const kelvin = cel + 273.15;
  const rankine = ((cel + 273.15) * 9) / 5;
   const currentWeather = useSelector((state) => state.weather.current || {});

    const inputCurrentTemp = () => {
    setCel(currentWeather?.main?.temp || 0)
  }

  return (
    <div>
      <div className="temp">
        <h3>온도변환기</h3>
        <div className="temp-con">
          <div>
            <label htmlFor="celsius">섭씨</label>
            <br />
            <input
              type="number"
              id="celsius"
              value={cel}
              onChange={(e) => setCel(Number(e.target.value))}
              autoFocus
            />
            <span>°C</span>
          </div>
          <FontAwesomeIcon icon={faRightLong} className="arrow" />
          <div className="trans">
            <div>
              <label htmlFor="fahrenheit">화씨</label>
              <br />
              <input
                type="number"
                id="fahrenheit"
                value={fahrenheit?.toFixed(1)}
                readOnly
              />
              <span>°F</span>
            </div>
            <div>
              <label htmlFor="kelvin">켈빈</label>
              <br />
              <input
                type="number"
                id="kelvin"
                value={kelvin?.toFixed(2)}
                readOnly
              />
              <span>K</span>
            </div>
            <div>
              <label htmlFor="rankine">랭킨</label>
              <br />
              <input
                type="number"
                id="rankine"
                value={rankine?.toFixed(2)}
                readOnly
              />
              <span>°R</span>
            </div>
          </div>
        </div>
         <button type="button" onClick={inputCurrentTemp}>현재 날씨 불러오기</button>
      </div>
    </div>
  );
};

export default Temp;
