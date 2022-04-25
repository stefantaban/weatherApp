import Card from "../Card";
import classes from './Days.module.css'

const Days = ({ forecastData }) => {
  

  console.log(forecastData);

  return (
    <div className={classes.daysContainer}>
      {forecastData.map((e) => {
        return (
          <Card>
            <h3>{e.weekDay}</h3>
            <p>{`${e.month} ${e.day}, ${e.currentHour}`}</p>
            <img src={e.imgUrl} />
            <h2>{Math.floor(e.temperature)} °C</h2>
            <p>{e.condition}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default Days;
