import React from "react";

const WeatherSkeleton = ({ isDark }) => {
  return (
    <div className={`weather ${isDark ? "dark" : ""}`}>
      <div className="weather-main">
        <div className="skeleton skeleton-input"></div>

        <div className="main-con">
          <div className="skeleton skeleton-city"></div>

          <div className="weather-icon">
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-temp"></div>
          </div>

          <div className="weather-info">
            <div className="skeleton skeleton-info"></div>
            <div className="skeleton skeleton-info"></div>
            <div className="skeleton skeleton-info"></div>
          </div>
        </div>
      </div>

      <div className="weather-by-hour">
        <div className="skeleton skeleton-title"></div>
        <div className="card-con">
          {Array(7)
            .fill()
            .map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton skeleton-time"></div>
                <div className="skeleton skeleton-small-icon"></div>
                <div className="skeleton skeleton-small-temp"></div>
              </div>
            ))}
        </div>
      </div>

      <div className="weather-by-weekly-date">
        <div className="skeleton skeleton-title"></div>
        <div className="card-con">
          {Array(5)
            .fill()
            .map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton skeleton-time"></div>
                <div className="skeleton skeleton-small-icon"></div>
                <div className="skeleton skeleton-range"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
