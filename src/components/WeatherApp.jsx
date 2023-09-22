import React, { useEffect, useState } from "react";
import "./WeatherStyle.css";
import { AxiosService } from "../source/service/axiosService";

import { Link, useNavigate, useParams } from "react-router-dom";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCityName] = useState("");

  const [differentCity, setDifferentCity] = useState("");

  const [loader, setLoader] = useState(false);

  const [err, setErr] = useState(false);

  const axiosService = new AxiosService();

  const { cityName } = useParams();
  const localData = JSON.parse(localStorage.getItem("homeTown"));

  useEffect(() => {
    const homeTown = cityName
      ? cityName
      : JSON.parse(localStorage.getItem("homeTown"));
    if (homeTown) {
      getData(homeTown);
    }
  }, []);

  const getData = (city) => {
    setLoader(true);
    axiosService
      .fetch(city)
      .then((response) => {
        if (response && response.data) {
          console.log(response);
          setWeatherData(response.data);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setErr(true);
        setLoader(false);
      });
  };

  const showAlert = (type) => {
    alert(
      type == "homeTown"
        ? "city name can not be empty!"
        : "different city name can not be empty!"
    );
  };

  return (
    <div className="container">
      {!localData && !cityName && (
        <div className="mainArea">
          <h2>Live weather report</h2>
          <hr></hr>
          <input
            type="text"
            value={city}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Please set your hometown..."
          />
          <button
            onClick={() => {
              if (!city) {
                showAlert("homeTown");
              } else {
                localStorage.setItem("homeTown", JSON.stringify(city));
                getData(city);
              }
            }}
          >
            Set
          </button>
        </div>
      )}

      <div className="displayArea">
        {loader ? (
          <h1>wait for weather...</h1>
        ) : err ? (
          <h1>something went wrong, refresh the page to try again</h1>
        ) : (
          <>
            {weatherData &&
              weatherData.forecast &&
              weatherData.forecast.forecastday &&
              weatherData.forecast.forecastday.length > 0 &&
              weatherData.forecast.forecastday[0] &&
              weatherData.forecast.forecastday[0].day && (
                <>
                  <div className="title">
                    <h4>
                      {" "}
                      Right now in {weatherData.location.name} |{" "}
                      {weatherData.location.country} there is{" "}
                      {weatherData.forecast.forecastday[0].day.condition.text}
                    </h4>
                  </div>

                  <div className="centralPart">
                    <div className="iconImage">
                      <img
                        src={weatherData.current.condition.icon}
                        alt="image"
                      />
                    </div>
                    <div className="temperature">
                      <h2 id="bigTemp">
                        {weatherData.forecast.forecastday[0].day.avgtemp_c}&deg;
                      </h2>
                      <h3 id="smallTemp">
                        {weatherData.forecast.forecastday[0].day.mintemp_c}&deg;
                        | {weatherData.forecast.forecastday[0].day.maxtemp_c}
                        &deg;
                      </h3>
                    </div>
                    <div className="threeItem">
                      <h2>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="icons"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {weatherData.current.gust_kph} kmph
                      </h2>
                      <h2>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="icons"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {weatherData.current.cloud} %
                      </h2>
                      <h2>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="icons"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {weatherData.current.humidity} %
                      </h2>
                    </div>
                  </div>

                  <div className="bottomPart">
                    <div>
                      <div className="innerBP">
                        <img
                          className="innerImg"
                          src={
                            weatherData.forecast.forecastday[0].day.condition
                              .icon
                          }
                        />
                      </div>
                      <div className="writting">
                        {weatherData.forecast.forecastday[0].day.maxtemp_c}&deg;
                        | {weatherData.forecast.forecastday[0].day.mintemp_c}
                        &deg;
                      </div>
                    </div>

                    <div>
                      <div className="innerBP">
                        <img
                          className="innerImg"
                          src={
                            weatherData.forecast.forecastday[1].day.condition
                              .icon
                          }
                        />
                      </div>
                      <div className="writting">
                        {weatherData.forecast.forecastday[1].day.maxtemp_c}&deg;
                        | {weatherData.forecast.forecastday[1].day.mintemp_c}
                        &deg;
                      </div>
                    </div>
                    <div>
                      <div className="innerBP">
                        <img
                          className="innerImg"
                          src={
                            weatherData.forecast.forecastday[2].day.condition
                              .icon
                          }
                        />
                      </div>
                      <div className="writting">
                        {weatherData.forecast.forecastday[2].day.maxtemp_c}&deg;
                        | {weatherData.forecast.forecastday[2].day.mintemp_c}
                        &deg;
                      </div>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={differentCity}
                    onChange={(e) => setDifferentCity(e.target.value)}
                    placeholder="enter different city name..."
                  />
                  <button
                    onClick={() => {
                      if (!differentCity) {
                        showAlert("diff");
                      } else {
                        window.open(`/${differentCity}`, "_blank");
                      }
                    }}
                  >
                    Search
                  </button>
                </>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
