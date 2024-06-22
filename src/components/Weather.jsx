import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./weather.css";
export default function Weather() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=c5028f1b5acb4afd889103043242106&q=${cityName}&days=8`
      );
      let result = await response.json();
      
      if (result.location) {
        setWeatherData(result);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="weather--dashboard">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="search"
          name="city"
          className="search--box"
          placeholder="search by city"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          
        />
        <button type="submit" className="submit--btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
            alt="search"
            className="search--img--button"
          />
        </button>
      </form>

      <div className="dashboard--inner">
        <div className="current--time">
          <p>Weather Forecast</p>
          <p>{weatherData?.location?.localtime}</p>
        </div>

        {weatherData?.current && (
          <div className="weather--container">
            <div className="weather--details--left">
              <p className="city--name">{weatherData.location.name}</p>
              <div className="weather--img--container">
                <img
                  src={weatherData.current.condition.icon}
                  className="weather--img"
                  alt="weather.."
                />
                <p className="temp">
                  {weatherData.current.temp_c}
                  <sup>o</sup>C
                </p>
              </div>
            </div>
            <div className="weather--details--right">
              <p className="feels--like">
                feels like {weatherData.current.feelslike_c}
                <sup>o</sup>C
              </p>
             
              <div className="humadity">
                <img
                  src="https://uploads-ssl.webflow.com/63373991b8094c5fce83b830/63f50bc44296fd879e650a8b_air-humidity.jpg"
                  className="humadity--img"
                  alt="weather.."
                />
                <p>
                  Humadity :{" "}
                  <span className="span--details">
                    {weatherData.current.humidity}%
                  </span>
                </p>
              </div>
              <div className="humadity">
                <img
                  src="https://media.istockphoto.com/id/1347708317/vector/wind-weather-thin-line-icon.jpg?s=612x612&w=0&k=20&c=_CZj2l6ecQpFu4doH4nrDTipA6g1zAIfn93IrFn3N4s="
                  className="humadity--img"
                  alt="weather.."
                />
                <p>
                  Wind :{" "}
                  <span className="span--details">
                    {weatherData.current.wind_kph} kph
                  </span>
                </p>
              </div>
              <div className="humadity">
                <img
                  src="https://www.shutterstock.com/image-vector/air-pressure-icon-elements-weather-600nw-1656068398.jpg"
                  className="humadity--img"
                  alt="weather.."
                />
                <p>
                  Pressure :{" "}
                  <span className="span--details">
                    {weatherData.current.pressure_mb} hPa
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
      {weatherData?.forecast?.forecastday && <p className="seven--day--text">10 hours Weather Forecast</p>}
        <div className="seven--day">

        {weatherData?.forecast?.forecastday &&
          weatherData.forecast.forecastday[0].hour.slice(14).map((val) => {
            return <div className="seven--day--container" key={val.time}>

                <p className="seven--day--data1">{val.time}</p>
                <img src={val.condition.icon} alt="icon" style={{width:"50px",height:"50px"}} />
                <p className="seven--day--data2" style={{marginLeft:"10px", color:"blue"}}>{val.temp_c}<sup>o</sup>C</p> 
                </div>
          })}
          </div>
      {weatherData?.forecast?.forecastday && <p className="seven--day--text">Seven Days Weather Forecast</p>}
        <div className="seven--day">

        {weatherData?.forecast?.forecastday &&
          weatherData.forecast.forecastday.slice(1).map((val) => {
            return <div className="seven--day--container" key={val.date}>
                <p className="seven--day--data1">{val.date}</p>
              <img src={val.day.condition.icon} alt="icon" style={{width:"50px",height:"50px"}} />
                <p className="seven--day--data2" style={{marginLeft:"10px", color:"blue"}}>{val.day.avgtemp_c}<sup>o</sup>C</p> 
                </div>
          })}
          </div>
      </div>
    </div>
  );
}
