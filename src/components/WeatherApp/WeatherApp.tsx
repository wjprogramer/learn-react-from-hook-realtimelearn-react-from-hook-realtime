import { useState } from "react";
import styled from '@emotion/styled';

import { ReactComponent as CloudyIcon } from '../../assets/image/weather-app-images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from '../../assets/image/weather-app-images/airFlow.svg';
import { ReactComponent as RainIcon } from '../../assets/image/weather-app-images/rain.svg';
import { ReactComponent as RedoIcon } from '../../assets/image/weather-app-images/refresh.svg';

import catcherIcon from "../../assets/image/The Weather is Nice Today/SVG/64/2682810 - catcher direction flag weather wind windy.svg";

import { CWB_API_AUTH_CODE } from "../../config";

const Container = styled.div`
  background-color: #ededed;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  ${props => {
    console.log(props);
    return props.toString();
  }};
  color: ${props => props.theme === 'dark' ? '#dadada' : '#212121'};
  font-size: 50px;
`
const WeatherCardContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: #212121;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
`;

const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;
  
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

const License = styled.div`
  width: 100%;
  display: block;
  margin: auto;
  text-align: left;
  padding: 16px;
  color: #707070;
`

const Link = styled.a`
  text-decoration: none;
  color: #707070;
  &:hover {
    color: #363636;
  }
`

const Table = styled.table`
  td, th {
    padding: 8px;
  }
  th {
    padding-bottom: 16px;
  }
`;

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
        <License>
          <Table>
            <tr>
              <th colSpan={2}>
                ICON SOURCE
              </th>
            </tr>
            <tr>
              <td>Designer</td>
              <td>
                <Link href="https://www.iconfinder.com/laurareen">Laura Reen</Link>
              </td>
            </tr>
            <tr>
              <td>License</td>
              <td>
                <Link href="http://creativecommons.org/licenses/by-nc/3.0/">Creative Commons <br/>(Attribution-Noncommercial 3.0 Unported)</Link>
              </td>
            </tr>
          </Table>
        </License>

      </Content>
    </Container>
  );
}

export default WeatherApp;