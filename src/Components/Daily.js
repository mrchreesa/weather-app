import React from "react";
import Box from "@mui/material/Box";
import moment from "moment";
import iconChange from "../Lib/function";

export default function Daily({ state }) {
  const { hourlyTemp, dailyTemp } = state;
  let now = moment(Date.now()).format("HH:mm");
  // let now = "23:00";

  console.log(now);
  return (
    <div className="daily-container">
      <p>7-Day Forcast</p>

      <Box
        className={
          // now > dailyTemp[0]?.sunrise && now < dailyTemp[0]?.sunset
          //   ? "daily-box"
          //   : "daily-box-night"
          "daily-box-night"
        }
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ maxWidth: { xs: 580, sm: "100%" }, bgcolor: "background.paper" }}
      >
        {dailyTemp?.map((item, i) => (
          <>
            <div className="daily-temp day">
              {i == 0 ? <h1>Today</h1> : <h1>{item.day}</h1>}
              <img
                src={iconChange(
                  item.weathercode,
                  "14",
                  item.sunrise,
                  item.sunset
                )}
                alt=""
              />
            </div>
            <div className="daily-temp min">
              <h1>L: {item.dailyMin}&#176;</h1>
            </div>
            <div className="daily-temp max">
              <h1>H: {item.dailyMax}&#176;</h1>
            </div>
          </>
        ))}
      </Box>
    </div>
  );
}
