/// API Data

const apiData = {
  tempreture: [15.8, 16, 15.3, 14.8, 14.9, 14.5],

  time: [
    "2022-06-13T00:00",
    "2022-06-13T01:00",
    "2022-06-13T02:00",
    "2022-06-13T03:00",
    "2022-06-13T04:00",
    "2022-06-13T05:00",
  ],
};

/// Data structuring

let newArray = [];

apiData.tempreture.forEach((dataItem, dataIndex) => {
  newArray.push({
    hour: moment(dateTime).format("hh a"),
    temp: apiData.time[dataIndex],
  });
});

/// Outcome

newArray = [
  { hour: "12 am", temp: 15.8 },
  { hour: "01 am", temp: 16 },
  { hour: "02 am", temp: 15.3 },
  { hour: "03 am", temp: 14.8 },
  { hour: "04 am", temp: 14.9 },
  { hour: "05 am", temp: 14.5 },
];
