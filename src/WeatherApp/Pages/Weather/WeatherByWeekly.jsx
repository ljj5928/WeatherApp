import React, { useMemo } from "react";

const WeatherByWeekly = ({ dailyWeather }) => {
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
    const noonItem = items.find((item) =>
      item?.dt_txt.includes("09:00:00")
    );
    return noonItem?.weather?.[0]?.icon;
  };

  const getDayOfWeek = (dateStr) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[new Date(dateStr).getDay()];
  };


  const dailyTemps = useMemo(() => {
    return Object.entries(groupedByDate).map(
      ([date, { rawDate, items }]) => {
        const tempsMin = items.map((i) => i.main.temp_min);
        const tempsMax = items.map((i) => i.main.temp_max);

        return {
          date: `${date} (${getDayOfWeek(rawDate)})`,
          minTemp: Math.min(...tempsMin).toFixed(1),
          maxTemp: Math.max(...tempsMax).toFixed(1),
          icon: getNoonIcon(items),
        };
      }
    );
  }, [groupedByDate]);



  return (
    <div className="weather-by-weekly-date">
      <h4>주간 날씨</h4>
      <div className="card-con">
        {dailyTemps.slice(0, 5).map((item, idx) => (
          <div key={idx} className="card">
            <span>{item.date}</span>
            <span>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                width="50px"
              />
            </span>
            <div>
              <span className="min-temp">{item.minTemp}°</span> /
              <span className="max-temp">{item.maxTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherByWeekly;