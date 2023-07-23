import React, { useEffect, useState } from "react";
import "./css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const sumofArray = (sum, num) => {
  return sum + num;
};
const getDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};

const getAverage = (averages, par1, par2) => {
  return (
    Math.round((averages.slice(par1, par2).reduce(sumofArray) / 8) * 100) / 100
  );
};
const windDirection = (degree) => {
  if ((degree > 337.5 && degree < 360) || (degree > 22.5 && degree < 22.5)) {
    return "Northerly";
  } else if (degree > 22.5 && degree < 67.5) {
    return "North Easterly";
  } else if (degree > 67.5 && degree < 112.5) {
    return "Easterly";
  } else if (degree > 122.5 && degree < 157.5) {
    return "South Easterly";
  } else if (degree > 157.5 && degree < 202.5) {
    return "Southerly";
  } else if (degree > 202.5 && degree < 247.5) {
    return "South Westerly";
  } else if (degree > 247.5 && degree < 292.5) {
    return "Westerly";
  } else if (degree > 292.5 && degree < 337.5) {
    return "North Westerly";
  }
};

const TempApp = () => {
  const [city, setCity] = useState(null);
  const [search, setsearch] = useState("mumbai");
  const [displayData, setDisplayData] = useState(true);
  const [displayError, setDisplayError] = useState("");
  const [daysList, setDaysList] = useState([]);
  const [datesList, setDatesList] = useState([]);
  const [lattitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [isToggled, setToggled] = useState(true);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const url =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        search +
        (isToggled ? "&units=metric" : "&units=imperial") +
        "&appid=fffd9a0dd2181e6a5ff534c80752177d";
      const response = await fetch(url);
      const resjson = await response.json();

      setCity(resjson);

      if (resjson.message) {
        setDisplayError(resjson.message);
        setDisplayData(false);
        setLongitude(0);
        setLatitude(0);
      } else {
        setDisplayData(true);
        setLongitude(resjson.coord.lon);
        setLatitude(resjson.coord.lat);
      }
    };
    fetchApi();
    const fetchFiveDayData = async () => {
      const url =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lattitude +
        "&lon=" +
        longitude +
        (isToggled ? "&units=metric" : "&units=imperial") +
        "&appid=fffd9a0dd2181e6a5ff534c80752177d";
      const response = await fetch(url);
      const resjson = await response.json();

      const averages = resjson.list.map((item) => item.main.temp);
      const dates = resjson.list.filter((item) => {
        let temp = resjson.list.indexOf(item);
        if ((temp + 1) % 8 === 0) {
          return item.dt;
        }
      });
      setDatesList(dates);

      let days = [];
      days = [...days, getAverage(averages, 0, 8)];
      days = [...days, getAverage(averages, 8, 16)];
      days = [...days, getAverage(averages, 16, 24)];
      days = [...days, getAverage(averages, 24, 32)];
      days = [...days, getAverage(averages, 32, 40)];

      setDaysList(days);
    };
    fetchFiveDayData();
  }, [search, isToggled]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            style={{ border: "none",textAlign:"center", height: "50px" }}
            type="search"
            value={search}
            className="inputFeild"
            onChange={(event) => {
              setsearch(event.target.value);
            }}
          />
        </div>

        

        {city && displayData && (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-street-view"></i>
                {search}
              </h2>
              <h1 className="temp">
                {city.main.temp} {isToggled ? "°Cel" : "Fah"}
                <FontAwesomeIcon
                  icon={isToggled ? faToggleOn : faToggleOff}
                  onClick={handleToggle}
                  style={{
                    cursor: "pointer",
                    fontSize: "34px",
                    marginLeft: "15px",
                  }}
                />
              </h1>
              <h3 className="tempin_max">
                Min:{city.main.temp_min} {isToggled ? "°Cel" : "Fah"} | Max:
                {city.main.temp_max} {isToggled ? "°Cel" : "Fah"}
              </h3>
              <h3> Humidity:{city.main.humidity}</h3>
              <h3> Wind Speed:{city.wind.speed}</h3>
              <h3> Wind Direction:{windDirection(city.wind.deg)}</h3>

              <h3> Description:{city.weather[0].description}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              />

              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    {datesList.map((item) => {
                      return <th>{getDate(item.dt)}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {daysList.map((item) => {
                      return (
                        <td>
                          {item} {isToggled ? "°Cel" : "Fah"}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    {datesList.map((item) => {
                      return <td>{item.weather[0].description}</td>;
                    })}
                  </tr>
                  <tr>
                    {datesList.map((item) => {
                      return (
                        <td>
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}

        {city && !displayData && <p>{displayError}</p>}
      </div>
    </>
  );
};

export default TempApp;
