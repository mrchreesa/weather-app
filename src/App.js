import axios from "axios";
import { useEffect, useReducer } from "react";
import moment from "moment";
import "./App.css";
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
      action.payload.hourly.time
        .slice(0, 48)
        .forEach((dateTime, timeTempIndex) => {
          hourlyTemp.push({
            hour: moment(dateTime).format("hh a"),
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  console.log(state);

  return (
    <div className="App">
      {state.hourlyTemp.map((item) => (
        <>
          <h1>{item.hour}</h1>
          <h1>{item.temp}</h1>
        </>
      ))}
      <h1>{state.tempreture}</h1>
      <h1>{state.time}</h1>
    </div>
  );
}

export default App;
