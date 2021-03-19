import { useState, useEffect } from "react";

import { ReactComponent as AirFlowIcon } from '../../assets/image/weather-app-images/airFlow.svg';
import { ReactComponent as RainIcon } from '../../assets/image/weather-app-images/rain.svg';
import { ReactComponent as RedoIcon } from '../../assets/image/weather-app-images/refresh.svg';

import catcherIcon from "../../assets/image/The Weather is Nice Today/SVG/64/2682810 - catcher direction flag weather wind windy.svg";

import { CWB_API_AUTH_CODE } from "../../config";

import {
  Container,
  Content,
  Title,
  WeatherCardContainer,
  WeatherCard,
  Location,
  Description,
  CurrentWeather,
  Temperature,
  Celsius,
  AirFlow,
  Rain,
  Cloudy,
  Redo,
  License,
} from "./components";

const WeatherApp = () => {

  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast(),
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
      });
    };

    fetchData();
  }, []);

  const fetchCurrentWeather = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${CWB_API_AUTH_CODE}&locationName=臺北`
    )
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0];

        const weatherElements = locationData.weatherElement.reduce(
          (neededElements: any, item: any) => {
            if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },
          {}
        );

        return {
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          humid: weatherElements.HUMD,
        };
      });
  };

  const fetchWeatherForecast = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${CWB_API_AUTH_CODE}&locationName=臺北市`
    )
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0];
        const weatherElements = locationData.weatherElement.reduce(
          (neededElements: any, item: any) => {
            if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
              neededElements[item.elementName] = item.time[0].parameter;
            }
            return neededElements;
          },
          {}
        );
  
        return {
          description: weatherElements.Wx.parameterName,
          weatherCode: weatherElements.Wx.parameterValue,
          rainPossibility: weatherElements.PoP.parameterName,
          comfortability: weatherElements.CI.parameterName,
        };
      });
  };

  return (
    <Container>
      <Content>

        {/* Title */}
        <Title theme="light">
          Weather
          <img 
            src={catcherIcon} 
            alt="Just a decoration"
            style={{
              width: "50px",
              marginLeft: "20px",
              transform: "translateY(5px)",
            }}
          />
        </Title>

        {/* Main Info */}
        <WeatherCardContainer>
          <WeatherCard>
            <Location>{weatherElement.locationName}</Location>
            <Description>
              {weatherElement.description} {weatherElement.comfortability}
            </Description>
            <CurrentWeather>
              <Temperature>
                {Math.round(weatherElement.temperature)} <Celsius>°C</Celsius>
              </Temperature>
              <Cloudy />
            </CurrentWeather>
            <AirFlow>
              <AirFlowIcon />
              {weatherElement.windSpeed} m/h
            </AirFlow>
            <Rain>
              <RainIcon />
              {Math.round(weatherElement.rainPossibility)} %
            </Rain>
            <Redo onClick={() => {
              fetchCurrentWeather();
              fetchWeatherForecast();
            }}>
              最後觀測時間：
              {new Intl.DateTimeFormat('zh-TW', {
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(weatherElement.observationTime))}{' '}
              <RedoIcon />
            </Redo>
          </WeatherCard>
        </WeatherCardContainer>

        {/* License */}
        <License />

      </Content>
    </Container>
  );
}

export default WeatherApp;