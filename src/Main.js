import React, { useEffect, useReducer } from "react";
import axios from "axios";
import moment from "moment";
import Location from "./Components/Location";
import Hourly from "./Components/Hourly";
import Daily from "./Components/Daily";

const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=Europe%2FLondon";
const initialState = {
  hourlyTemp: [],
  dailyTemp: [],
};

const ACTIONS = {
  TEMP_DATA: "TEMP_DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TEMP_DATA: {
      let hourlyTemp = [];
      let dailyTemp = [];

      let currentTime = Number(moment().format("HH"));

      action.payload.hourly.time
        .slice(0, 69)
        .forEach((dateTime, timeTempIndex) => {
          hourlyTemp.push({
            hour: moment(dateTime).format("HH"),
            temp: action.payload.hourly.temperature_2m[timeTempIndex],
            weathercode: action.payload.hourly.weathercode[timeTempIndex],
          });
        });

      action.payload.daily.time.forEach((time, timeIndex) => {
        dailyTemp.push({
          dailyMin: action.payload.daily.temperature_2m_min[timeIndex],
          dailyMax: action.payload.daily.temperature_2m_max[timeIndex],
          weathercode: action.payload.daily.weathercode[timeIndex],
          sunrise: moment(action.payload.daily.sunrise[timeIndex]).format(
            "HH:mm"
          ),
          sunset: moment(action.payload.daily.sunset[timeIndex]).format(
            "HH:mm"
          ),
          day: moment(time).format("ddd"),
        });
      });
      const updateState = {
        ...state,
        ...{
          hourlyTemp: hourlyTemp.slice(currentTime, currentTime + 48),
          dailyTemp: dailyTemp,
        },
      };
      return updateState;
    }
  }
};

export default function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  let now = moment(Date.now()).format("HH:mm");
  // let now = "23:00";
  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      console.log(response);
      dispatch({
        type: ACTIONS.TEMP_DATA,
        payload: response.data,
      });
      //response.data.hourly.temperature_m2[0]
    });
  }, []);
  return (
    <div
      className={
        now > state.dailyTemp[0]?.sunrise && now < state.dailyTemp[0]?.sunset
          ? "main-container"
          : "main-container-night"
      }
    >
      {" "}
      <Location state={state} dispatch={dispatch} />
      <Hourly state={state} dispatch={dispatch} />
      <Daily state={state} dispatch={dispatch} />
    </div>
  );
}
