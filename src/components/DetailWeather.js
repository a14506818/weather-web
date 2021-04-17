import React from "react";

export default function DetailWeather({ icon, title, description }) {
  return (
    <div
      className="detailWeather"
      data-tilt
      data-tilt-glare="true"
      data-tilt-max-glare="0.4"
    >
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
}
