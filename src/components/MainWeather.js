import React from "react";
import "../css/style.css";

export default function MainWeather({ weatherData, curDateTime, setReload }) {
  const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png `;

  return (
    <div
      className="mainWeather"
      data-tilt
      data-tilt-glare="true"
      data-tilt-max-glare="0.4"
      // onClick={() => setReload()}
    >
      <div className="reloadBtn">
        <i className="fas fa-sync-alt"></i>
      </div>
      <div className="area">
        {weatherData.name + ", " + weatherData.sys.country}
      </div>
      <div className="weatherIcon">
        <img src={icon} width="250px"></img>
      </div>
      <div className="temperature">{Math.round(weatherData.main.temp)}</div>
      <div className="weatherDescription">
        {weatherData.weather[0].main}, {weatherData.weather[0].description}
      </div>
      <div className="timeStamp">{`${curDateTime.Y} ${curDateTime.Mon} ${curDateTime.D} ${curDateTime.H}:${curDateTime.Min} ${curDateTime.W}`}</div>
    </div>
  );
}
