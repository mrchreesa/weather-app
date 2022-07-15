import React, { useEffect, useReducer } from "react";
import moment from "moment";
import "../App.css";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import iconChange from "../Lib/function";

let now = moment(Date.now()).format("HH:mm");
// let now = "23:00";
console.log(now);
export default function Hourly({ state, dispatch }) {
  return (
    <div className="hourly-container">
      <Box
        className={
          now > state.dailyTemp[0]?.sunrise && now < state.dailyTemp[0]?.sunset
            ? "hourly-box"
            : "hourly-box-night"
        }
        sx={{
          width: "93vw",
          maxWidth: { xs: 380, sm: "100%" },
          bgcolor: "background.paper",
        }}
      >
        <Tabs variant="scrollable" scrollButtons="auto" visibleScrollbar="true">
          {state.hourlyTemp.map((item, index) => (
            <div className="hours-temp">
              {index == 0 ? <h1>Now</h1> : <h1>{item.hour}</h1>}
              <img
                src={iconChange(
                  item.weathercode,
                  now,
                  state.dailyTemp[0]?.sunrise,
                  state.dailyTemp[0]?.sunset
                )}
                alt=""
              />

              <h1>{item.temp.toString().slice(0, 2)}&#176;</h1>
            </div>
          ))}
        </Tabs>
      </Box>
    </div>
  );
}
