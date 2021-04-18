import "./css/style.css";
import { useState, useEffect } from "react";
import MainWeather from "./components/MainWeather";
import DetailWeather from "./components/DetailWeather";
import SixWeather from "./components/SixWeather";

function App() {
  const [weatherData, setWeatherData] = useState({
    weather: [
      {
        main: "",
        description: "",
        icon: "01n.png ",
      },
    ],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
    },
    dt: 0,
    name: "",
    sys: {
      country: "",
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
  });
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [sixWeatherArr, setSixWeatherArr] = useState([]);
  const [reload, setReload] = useState(true);
  const [inputText, setInputText] = useState("Taichung");

  const apiData = {
    key: "cbd6dd463f2d94dcba6e97fa3655fb62",
    // city: "Taichung",
    // city: "taipei",
  };
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiData.key}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (/^2/.test(res.cod)) {
          setWeatherData(res);
        } else {
          alert("City not found");
        }
      });
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${inputText}&appid=${apiData.key}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (/^2/.test(res.cod)) {
          setTempMax(() => {
            let arr = [];
            for (let i = 0; i < 8; i++) {
              arr = [...arr, res.list[i].main.temp_max];
            }
            let tempMax = arr.reduce((max, cur) => {
              return max < cur ? cur : max;
            }, 0);
            return Math.round(tempMax);
          });
          setTempMin(() => {
            let arr = [];
            for (let i = 0; i < 8; i++) {
              arr = [...arr, res.list[i].main.temp_min];
            }
            let tempMin = arr.reduce((min, cur) => {
              return min > cur ? cur : min;
            }, 1000);
            return Math.round(tempMin);
          });
          setSixWeatherArr(() => {
            let arr = [];
            for (let i = 0; i < 6; i++) {
              arr = [
                ...arr,
                {
                  temp: Math.round(res.list[i].main.temp),
                  iconId: res.list[i].weather[0].icon,
                  time: res.list[i].dt,
                },
              ];
            }
            return arr;
          });
        }
      });
    setInputText("");
  }, [reload]);
  const setDateTime = (dt) => {
    const DT = new Date(dt * 1000);
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return {
      Y: "" + DT.getFullYear(),
      Mon: "" + (DT.getMonth() + 1),
      D: "" + DT.getDate(),
      H: DT.getHours() < 10 ? "0" + DT.getHours() : "" + DT.getHours(),
      Min: DT.getMinutes() < 10 ? "0" + DT.getMinutes() : "" + DT.getMinutes(),
      W: weekdays[DT.getDay()],
      S: DT.getSeconds() < 10 ? "0" + DT.getSeconds() : "" + DT.getSeconds(),
    };
  };
  const curDateTime = setDateTime(weatherData.dt);
  const sunriseTime = setDateTime(weatherData.sys.sunrise);
  const sunsetTime = setDateTime(weatherData.sys.sunset);

  return (
    <div className="app">
      <video src="raining.mp4" autoPlay loop muted></video>
      <div className="searchBox">
        <input
          type="text"
          className="input"
          placeholder="Your City"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="submit" onClick={() => setReload(!reload)}>
          <i className="fas fa-search"></i>
        </div>
      </div>
      <MainWeather
        weatherData={weatherData}
        curDateTime={curDateTime}
        setReload={() => setReload(!reload)}
      ></MainWeather>
      <div className="detailBox">
        <DetailWeather
          icon={<i className="fas fa-thermometer-three-quarters"></i>}
          title={"High-Low"}
          description={
            Math.round(Math.max(tempMax, weatherData.main.temp_max)) +
            "° - " +
            Math.round(Math.min(tempMin, weatherData.main.temp_min)) +
            "°"
          }
        ></DetailWeather>
        <DetailWeather
          icon={<i className="fas fa-wind"></i>}
          title={"Wind"}
          description={weatherData.wind.speed + " mph"}
        ></DetailWeather>
        <DetailWeather
          icon={<i className="fas fa-hand-holding-water"></i>}
          title={"Humidity"}
          description={weatherData.main.humidity + " %"}
        ></DetailWeather>
        <DetailWeather
          icon={<i className="far fa-sun"></i>}
          title={"Sunrise-Sunset"}
          description={`${sunriseTime.H}:${sunriseTime.Min} - ${sunsetTime.H}:${sunsetTime.Min}`}
        ></DetailWeather>
        <div
          className="sixBigBox"
          data-tilt
          data-tilt-glare="true"
          data-tilt-max-glare="0.4"
        >
          <div className="title">- - Weather Forecast - -</div>
          <div className="sixSmallBox">
            {sixWeatherArr.map((e) => {
              return (
                <SixWeather
                  key={e.time}
                  temp={e.temp}
                  iconId={e.iconId}
                  time={setDateTime(e.time).H + ":" + setDateTime(e.time).Min}
                ></SixWeather>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
