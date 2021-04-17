import React from "react";

export default function SixWeather({ temp, iconId, time }) {
  const icon = `http://openweathermap.org/img/wn/${iconId}@2x.png `;

  return (
    <div className="sixWeather">
      <div className="temperature">{temp}</div>
      <div className="icon">
        <img src={icon} width="50px"></img>
      </div>
      <div className="time">{time}</div>
    </div>
  );
}
