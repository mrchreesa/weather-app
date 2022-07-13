import React from "react";
import iconChange from "../Lib/function";

export default function Location({ state }) {
  const { hourlyTemp, dailyTemp } = state;

  return (
    <div className="location-container">
      <h1>London</h1>
      <img
        src={iconChange(hourlyTemp[0]?.weathercode, hourlyTemp.hour)}
        alt=""
      />
      <h1>{hourlyTemp[0]?.temp}&#176;</h1>
      <div className="lo-hi-container">
        <p>H: {dailyTemp[0]?.dailyMax}&#176;</p>
        <p>L: {dailyTemp[0]?.dailyMin}&#176;</p>
      </div>
    </div>
  );
}
