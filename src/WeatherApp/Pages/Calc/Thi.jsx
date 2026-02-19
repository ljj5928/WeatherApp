import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Thi = () => {
  const [tem, setTem] = useState(0);
  const [humid, setHumid] = useState(0);
  const currentWeather = useSelector((state) => state.weather.current || {});

  const inputCurrentTempHumid = () => {
    setTem(currentWeather?.main?.temp || 0);
    setHumid(currentWeather?.main?.humidity || 0)
  };
  return (
    <div className="thi">
      <h3>불쾌지수 계산기</h3>
      <div className="thi-con">
        <div className="thi-input">
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
        </div>
        <FontAwesomeIcon icon={faRightLong} className="arrow" />
        <div>
          <label htmlFor="thi-value">불쾌 지수</label>
          <br />
          <input
            type="number"
            id="thi-value"
            value={(
              0.81 * tem +
              0.01 * humid * (0.99 * tem - 14.3) +
              46.3
            ).toFixed(1)}
            readOnly
          />
        </div>
      </div>
      <button type="button" onClick={inputCurrentTempHumid}>현재 날씨 불러오기</button>
      <div className="thi-info">
        <span className="label">지수별 상태</span>
        <div className="thi-info-t">
          <div>
            <span className="badge good">쾌적</span>
            <span className="desc">지수 &lt; 68</span>
          </div>
          <div>
            <span className="badge normal">약간 불쾌</span>
            <span className="desc">지수 68~75</span>
          </div>
          <div>
            <span className="badge bad">불쾌</span>
            <span className="desc">지수 75~80</span>
          </div>
          <div>
            <span className="badge worst">매우 불쾌</span>
            <span className="desc">지수 80+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thi;
