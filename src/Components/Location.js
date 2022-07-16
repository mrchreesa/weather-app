import React from "react";
import iconChange from "../Lib/function";
import moment from "moment";

export default function Location({ state }) {
  const { hourlyTemp, dailyTemp } = state;
  let now = moment(Date.now()).format("HH:mm");

  return (
    <div className="location-container">
      <h1>London</h1>
      <img
        src={iconChange(
          hourlyTemp[0]?.weathercode,
          // now,
          "24",
          dailyTemp[0]?.sunrise,
          dailyTemp[0]?.sunset
        )}
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
