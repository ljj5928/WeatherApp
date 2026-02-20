import React, { useMemo } from "react";
import { formatTemp } from "../../util/temperature";

const WeatherByWeekly = ({ dailyWeather ,unit}) => {
  /* ===== 날짜별 그룹화 ===== */

  const groupedByDate = useMemo(() => {
    return dailyWeather
      .filter((item) => item?.dt_txt)
      .reduce((acc, item) => {
        const [fullDate] = item.dt_txt.split(" ");
        const [, month, day] = fullDate.split("-");
        const formattedDate = `${Number(month)}/${Number(day)}`;

        if (!acc[formattedDate]) {
          acc[formattedDate] = {
            rawDate: fullDate,
            items: [],
          };
        }

        acc[formattedDate].items.push(item);
        return acc;
      }, {});
  }, [dailyWeather]);

  const getNoonIcon = (items) => {
    const noonItem = items.find((item) => item?.dt_txt.includes("09:00:00"));
    return noonItem?.weather?.[0]?.icon;
  };

  const getDayOfWeek = (dateStr) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[new Date(dateStr).getDay()];
  };

  const dailyTemps = useMemo(() => {
    return Object.entries(groupedByDate).map(([date, { rawDate, items }]) => {
      const tempsMin = items.map((i) => i.main.temp_min);
      const tempsMax = items.map((i) => i.main.temp_max);

      return {
        date: `${date} (${getDayOfWeek(rawDate)})`,
        minTemp: Math.min(...tempsMin),
        maxTemp: Math.max(...tempsMax),
        icon: getNoonIcon(items),
      };
    });
  }, [groupedByDate]);

  return (
    <div className="weather-by-weekly-date">
      <h4>주간 날씨</h4>
      <div className="card-con">
        {dailyTemps.slice(0, 5).map((item, idx) => (
          <div key={idx} className="card">
            <div className="weekly-date">
              <span className="date">{item.date.split(" ")[0]}</span>
              <span className="day">{item.date.split(" ")[1]}</span>
            </div>
            <span>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                width="50px"
              />
            </span>
            <div className="weekly-temp">
              <span className="min-temp">{formatTemp(item.minTemp,unit)}</span>
              <span className="mobile-slash">/ </span>
              <span className="max-temp">{formatTemp(item.maxTemp,unit)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherByWeekly;
