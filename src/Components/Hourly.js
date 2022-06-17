import axios from "axios";
import React, { useEffect, useReducer } from "react";
// import initialState from "../Reducer/Reducer";
import moment from "moment";
import "../App.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FLondon";

const initialState = {
  hourlyTemp: [],
  tempMax: 0,
  tempMin: 0,
  time: "",
};

const ACTIONS = {
  TEMP_DATA: "TEMP_DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TEMP_DATA: {
      let hourlyTemp = [];
      let currentTime = Number(moment().format("HH"));
      console.log(typeof currentTime);
      action.payload.hourly.time
        .slice(currentTime, currentTime + 48)
        .forEach((dateTime, timeTempIndex) => {
          hourlyTemp.push({
            hour: moment(dateTime).format("HH"),
            temp: action.payload.hourly.temperature_2m[timeTempIndex],
          });
        });
      console.log(hourlyTemp);
      const updateState = {
        ...state,
        ...{
          hourlyTemp: hourlyTemp,
          tempMax: 0,
          tempMin: 0,
        },
      };
      return updateState;
    }
  }
};

export default function Hourly() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    <div className="hourly-container">
      <Box
        className="hourly-box"
        sx={{ maxWidth: { xs: 320, sm: "100%" }, bgcolor: "background.paper" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {state.hourlyTemp.map((item) => (
            <div className="hours-temp">
              <h1>{item.hour}</h1>
              <h1>{item.temp}</h1>
            </div>
          ))}
        </Tabs>
      </Box>
    </div>
  );
}
