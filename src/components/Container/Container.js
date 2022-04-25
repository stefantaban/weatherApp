import { useState, useEffect } from "react";
import Days from "../Card/Days/Days";
import classes from "./Container.module.css";

const currentHour = () => {
  let date = new Date();
  let hours = date.getHours();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().length === 1 ? "0" + hours : hours;
  return hours + ":" + "00" + " " + ampm;
};

const CITY = "Chisinau"

const Container = () => {
  const [threeHourData, setThreeHourData] = useState([]);

  function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=b0f56eed9c98415b8b7105509222504&q=${CITY}&days=5&aqi=no&alerts=no`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let formattedData = data.forecast.forecastday.map((e) => ({
          weekDay: new Date(e.date).toLocaleString("en-us", {
            weekday: "long",
          }),
          month: new Date(e.date).toLocaleString("en-us", { month: "long" }),
          day: new Date(e.date).toLocaleString("en-us", { day: "numeric" }),
          currentHour: currentHour(),
          temperature: e.hour.find((el) => el.time.substring(el.time.length - 5) === currentHour().substring(0, 5)).temp_c,
          imgUrl: e.hour.find((el) => el.time.substring(el.time.length - 5) === currentHour().substring(0, 5)).condition.icon,
          condition: e.hour.find((el) => el.time.substring(el.time.length - 5) === currentHour().substring(0, 5)).condition.text,
        }));
        setThreeHourData(formattedData);
      })
      .catch((error) => {
        setThreeHourData([]);
        console.log("Smth went wrong with the received data ", error);
      });
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>3-Day Forecast.</h1>
      </div>
      <div>
        <h3>{CITY}, RM</h3>
      </div>
      {threeHourData ? <Days forecastData={threeHourData} /> : "Loading..."}
    </div>
  );
};

export default Container;
