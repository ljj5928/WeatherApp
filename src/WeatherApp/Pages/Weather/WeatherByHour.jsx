import React from "react";
import { formatTemp } from "../../util/temperature";

const WeatherByHour = ({ dailyWeather, timezone ,unit}) => {
  const getLocalDate = (dtTxt) => {
    return new Date(dtTxt.replace(" ", "T"));
  };

  const getLocalTimeLabel = (dtTxt, timezone ) => {
    const local = getLocalDate(dtTxt);
    const hour = local.getHours() + timezone / 3600;

    return hour === 24
      ? "내일"
      : hour > 24
        ? `${hour - 24}시`
        : hour < 0
          ? `${hour + 24}시`
          : `${hour}시`;
  };

  const getCityLocalDate = (dtTxt, timezone) => {
    const utcDate = new Date(dtTxt.replace(" ", "T") + "Z");
    return new Date(utcDate.getTime() + timezone * 1000);
  };

  return (
    <div className="weather-by-hour">
      <h4>오늘 시간별 날씨</h4>
      <div className="card-con">
        {dailyWeather
          .filter((item) => {
            if (!timezone) return false;

            const itemLocalTime = getCityLocalDate(
              item.dt_txt,
              timezone,
            ).getTime();

            const nowLocalTime =
              Date.now() +
              (timezone + new Date().getTimezoneOffset() * 60) * 1000;

            return itemLocalTime >= nowLocalTime;
          })
          .slice(0, 7)
          .map((item, idx) => (
            <div key={idx} className="card">
              <span>{getLocalTimeLabel(item.dt_txt, timezone)}</span>
              <span>
                <img
                  src={`https://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}@2x.png`}
                  width="50px"
                />
              </span>
              <span>{formatTemp(item?.main?.temp,unit)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherByHour;
