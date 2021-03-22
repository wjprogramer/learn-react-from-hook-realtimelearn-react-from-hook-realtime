import { useState, useEffect, useCallback, useMemo } from "react";

import { ReactComponent as AirFlowIcon } from '../../assets/image/weather-app-images/airFlow.svg';
import { ReactComponent as RainIcon } from '../../assets/image/weather-app-images/rain.svg';
import { ReactComponent as RedoIcon } from '../../assets/image/weather-app-images/refresh.svg';
import { ReactComponent as LoadingIcon } from '../../assets/image/weather-app-images/loading.svg';

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
  WeatherIcon,
  Refresh,
  License,
} from "./components";
import theme, { ThemeType } from "./theme";

import { ThemeProvider } from '@emotion/react'
  
import sunriseAndSunsetData from './data/sunrise-sunset.json';

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

const getMoment = (locationName: any) => {
  const location = sunriseAndSunsetData.find(
    data => data.locationName === locationName,
  );

  if (!location) return null;

  const now = new Date();
  now.setFullYear(2020); // ignore year

  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  const locationDate: any = location.time && location.time.find(time => time.dataTime === nowDate);
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`,
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`,
  ).getTime();
  const nowTimeStamp = now.getTime();

  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night';
};

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
    isLoading: true,
  });
  const [currentTheme, setCurrentTheme] = useState(ThemeType.DARK);

  const {
    observationTime,
    locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast(),
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
    };

    setWeatherElement(prevState => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, []);

  const moment = useMemo(() => getMoment(locationName), [
    locationName,
  ]);
  
  useEffect(() => {
    fetchData();
  }, [ fetchData ]);

  useEffect(() => {
    setCurrentTheme(moment === 'day' 
      ? ThemeType.LIGHT 
      : ThemeType.DARK);
  }, [moment]);
  
  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <Content>
    
          {/* Title */}
          <Title theme={currentTheme}>
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
              <Location>{locationName}</Location>
              <Description>
                {description} {comfortability}
              </Description>
              <CurrentWeather>
                <Temperature>
                  {Math.round(temperature)} <Celsius>°C</Celsius>
                </Temperature>
                <WeatherIcon 
                  currentWeatherCode={weatherCode}
                  moment={moment || 'day'}
                />
              </CurrentWeather>
              <AirFlow>
                <AirFlowIcon />
                {windSpeed} m/h
              </AirFlow>
              <Rain>
                <RainIcon />
                {Math.round(rainPossibility)} %
              </Rain>
              <Refresh onClick={fetchData} isLoading={isLoading}>
                最後觀測時間：
                {new Intl.DateTimeFormat('zh-TW', {
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(observationTime))}{' '}
                {isLoading ? <LoadingIcon /> : <RedoIcon />}
              </Refresh>
            </WeatherCard>
          </WeatherCardContainer>

          {/* License */}
          <License />

        </Content>
      </Container>
    </ThemeProvider>
  );
}

export default WeatherApp;