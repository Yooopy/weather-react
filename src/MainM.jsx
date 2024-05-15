import { useEffect, useRef, useState } from "react";
import "./MainM.css";
function MainM() {
  const API_KEY = "85bbc0b223323a157715f7a942b9d8c4";
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [info, setInfo] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  let lat;
  let lon;
  let status;
  function settingCity(e) {
    setCity(String(e.target.value));
  }
  function getLatLon() {
    if (status) {
      document.getElementsByClassName("weather-container")[0].style.display =
        "none";
      status = false;
    } else {
      document.getElementsByClassName("weather-container")[0].style.display =
        "flex";
      status = true;
    }
    if (city.length > 0) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          lat = data[0].lat;
          lon = data[0].lon;
          getWeatherFromData(lat, lon, city);
        });
    }
  }

  function getWeatherFromData(lat, lon, city) {
    // alert(`${lat}, ${lon}, ${city}`);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemp(String(Math.floor(Number(data.main.temp) - 273.15) + "°c"));
        setInfo(data.weather[0].description);
        setWeatherIcon(data.weather[0].icon);
        setPressure(data.main.pressure + "hPa");
        setHumidity(data.main.humidity + "%");
      });
  }

  return (
    <main>
      <article className="main-art">
        <div className="container">
          <input
            onChange={(e) => settingCity(e)}
            className="search-inp"
            placeholder="Enter you city`s name"
            id="inp"
          ></input>
          <svg
            onClick={getLatLon}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#00000"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
        <div className="weather-container">
          <img
            className="weather-icon"
            src="./src/assets/icon.png"
            alt="weather-icon"
          ></img>
          <h2>{city}</h2>
          <h3>{temp}</h3>
          <h3>{info}</h3>
          <section className="other-info">
            <div>
              <p>Pressure: {pressure}</p>
            </div>
            <div>
              <p>Humidity: {humidity}</p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
export default MainM;
