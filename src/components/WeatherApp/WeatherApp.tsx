import { useState } from "react";

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

  const [currentWeather, setCurrentWeather] = useState({
    observationTime: '2019-10-02 22:10:00',
    locationName: '臺北市',
    description: '多雲時晴',
    temperature: 27.5,
    windSpeed: 0.3,
    humid: 0.88,
  });

  const handleClick = () => {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${CWB_API_AUTH_CODE}&locationName=臺北`
    )
      .then((response) => response.json())
      .then((data) => {
        // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
        const locationData = data.records.location[0];

        // STEP 2：將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
        const weatherElements = locationData.weatherElement.reduce(
          (neededElements: any, item: any) => {
            if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },
          {}
        );

        // STEP 3：要使用到 React 組件中的資料
        setCurrentWeather({
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          description: '多雲時晴',
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          humid: weatherElements.HUMD,
        });
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
            <Location>{currentWeather.locationName}</Location>
            <Description>{currentWeather.description}</Description>
            <CurrentWeather>
              <Temperature>
                {Math.round(currentWeather.temperature)} <Celsius>°C</Celsius>
              </Temperature>
              <Cloudy />
            </CurrentWeather>
            <AirFlow>
              <AirFlowIcon />
              {currentWeather.windSpeed} m/h
            </AirFlow>
            <Rain>
              <RainIcon />
              {Math.round(currentWeather.humid * 100)} %
            </Rain>
            <Redo onClick={handleClick}>
              最後觀測時間：
              {new Intl.DateTimeFormat('zh-TW', {
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(currentWeather.observationTime))}{' '}
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