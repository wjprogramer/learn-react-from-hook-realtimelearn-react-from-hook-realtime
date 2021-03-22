import { useState, useEffect, useMemo } from "react";

import catcherIcon from "../../assets/image/The Weather is Nice Today/SVG/64/2682810 - catcher direction flag weather wind windy.svg";

import {
  Container,
  Content,
  Title,
  WeatherCardContainer,
  WeatherCard,
  License,
} from "./components";
import theme, { ThemeType } from "./theme";

import { ThemeProvider } from '@emotion/react'
  
import sunriseAndSunsetData from './data/sunrise-sunset.json';

import useWeatherApi from "./useWeatherApi";

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
  const [weatherElement, fetchData] = useWeatherApi();
  const [currentTheme, setCurrentTheme] = useState(ThemeType.DARK);
  const { locationName } = weatherElement;

  const moment = useMemo(() => getMoment(locationName), [ locationName ]);
  
  useEffect(() => {
    setCurrentTheme(moment === 'day' 
      ? ThemeType.LIGHT : ThemeType.DARK);
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
            <WeatherCard 
              weatherElement={weatherElement}
              moment={moment}
              fetchData={fetchData}
            />
          </WeatherCardContainer>

          {/* License */}
          <License />

        </Content>
      </Container>
    </ThemeProvider>
  );
}

export default WeatherApp;