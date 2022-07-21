import React, { useEffect, useState } from "react";
import axios from "axios";
import cities from "./data/turkeyCities.json";
import "semantic-ui-css/semantic.min.css";
import {
  Dropdown,
  Grid,
  Segment,
  Divider,
  Card,
} from "semantic-ui-react";
import { useTheme } from "./context/ThemeContext";
import "../App.css";

function Weather() {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Ankara");

  const APIKey = "725PA6VPR7MGJCBJU4GPVYCQ9";
  const { theme } = useTheme();

  const tempc = (temp) => {
    if (weather) {
      return ((temp - 32) / 1.8).toFixed(1);
    } else {
      return "-";
    }
  };
  const changeddl = (e, data) => {
    setCity(data.value);
  };

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
  }

  useEffect(() => {
    axios(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${APIKey}`
    )
      .then((res) => setWeather(res.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  console.log(weather);
  const cityData = cities.map((city) => {
    return {
      key: city.id,
      text: city.name,
      value: city.name,
    };
  });
  return (
    <>
      <Segment basic textAlign="center">
        <Dropdown
          className="dropdown"
          style={{
            backgroundColor: "#4c5da3",
            color: "white",
            borderColor: "white",
            borderRadius: "10px",
            width: "400px",
          }}
          onChange={changeddl}
          value={cityData.text}
          placeholder="Please Select a City"
          //fluid
          search
          selection
          options={cityData}
        />

        <br />

        <Card
          fluid
          raised
          style={{ backgroundColor: "#dbe9f6" }}
          className={`card ${theme}`}
        >
          <Divider horizontal>
            DAILY WEATHER FORECAST ( {weather.resolvedAddress} )
          </Divider>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={6} computer={6}>
                    
                    <Grid.Row divided>
                      <h1>TODAY </h1>
                    </Grid.Row>
                    
                    <img
                      src={
                        "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/" +
                        weather.days[0].icon +
                        ".png"
                      }
                      width="100"
                      height="100"
                      alt={weather.days[0].icon}
                      
                    />
                    <h1>{tempc(weather.days[0].temp)}°C</h1>
                  </Grid.Column>


                  <Grid.Column mobile={16} tablet={10} computer={10}>
                    <Grid.Row divided></Grid.Row>
                    <div style={{ textAlign: "center" }}>
                      <Grid>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                          <span>
                            <h3> Minimum Temperature:</h3>
                            {tempc(weather.days[0].tempmin)}°C
                          </span>
                          <br />
                          <span>
                            <h3> Maximum Temperature:</h3>{" "}
                            {tempc(weather.days[0].tempmax)}°C
                          </span>
                          <br />
                          <span>
                            <h3> Feelslike:</h3>{" "}
                            {tempc(weather.days[0].feelslike)}
                            °C
                          </span>
                          <br />
                          <span>
                            <h3> Wind Speed:</h3> {weather.days[0].windspeed}{" "}
                            km/h
                          </span>
                          <br />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                          <span>
                            <h3> Humidity:</h3> {weather.days[0].humidity}%
                          </span>
                          <br />
                          <span>
                            <h3> Sunrise: </h3>
                            {weather.days[0].sunrise}
                          </span>
                          <br />
                          <span>
                            <h3> Sunset: </h3>
                            {weather.days[0].sunset}
                          </span>
                          <br />
                          <span>
                            <h3> Detail:</h3> {weather.days[0].description}
                          </span>
                        </Grid.Column>
                      </Grid>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider horizontal>WEEKLY WEATHER FORECAST</Divider>

              <Grid columns={6} divided>
                <Grid.Row>
                  {weather.days.map((day, index) => {
                    const img =
                      "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/" +
                      day.icon +
                      ".png";
                    return (
                      index > 0 &&
                      index < 9 && (
                        <Grid.Column
                          mobile={16}
                          tablet={8}
                          computer={4}
                          key={index}
                        >
                          {index === 1 ? (
                            <Divider horizontal>TOMORROW</Divider>
                          ) : (
                            <Divider horizontal>
                              {getDayOfWeek(day.datetime)}
                            </Divider>
                          )}
                          <h3>{tempc(day.temp)}°C</h3>
                          <img src={img} alt={day.icon} />
                          <p>
                            <span>Min:{tempc(day.tempmin)}°C</span>
                            <br />
                            <span>Max: {tempc(day.tempmax)}°C</span>
                          </p>
                          <br />
                        </Grid.Column>
                      )
                    );
                  })}
                </Grid.Row>
              </Grid>
            </>
          )}
        </Card>
        {/* <div align="right">
          <Divider />
          <Button
            icon
            onClick={() =>
              window.open(
                "https://github.com/mogretici/weather-forecast",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <Icon name="github" />
            Github Repository
          </Button>
        </div> */}
      </Segment>
    </>
  );
}

export default Weather;
