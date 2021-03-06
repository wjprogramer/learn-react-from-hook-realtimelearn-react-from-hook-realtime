import styled from '@emotion/styled';

import WeatherIcon from "./WeatherIcon";

import { ReactComponent as AirFlowIcon } from '../../../assets/image/weather-app-images/airFlow.svg';
import { ReactComponent as RainIcon } from '../../../assets/image/weather-app-images/rain.svg';
import { ReactComponent as RedoIcon } from '../../../assets/image/weather-app-images/refresh.svg';
import { ReactComponent as LoadingIcon } from '../../../assets/image/weather-app-images/loading.svg';
import { ReactComponent as CogIcon } from '../../../assets/image/weather-app-images/cog.svg';

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }: { theme: any }) => theme.boxShadow};
  background-color: ${({ theme }: { theme: any }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }: { theme: any }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }: { theme: any }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }: { theme: any }) => theme.temperatureColor};
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
  color: ${({ theme }: { theme: any }) => theme.textColor};
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
  color: ${({ theme }: { theme: any }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${(props: any) => props.theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }: { isLoading: boolean }) => (isLoading ? '1.5s' : '0s')};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

interface WeatherCardProps {
  cityName: string | null,
  weatherElement: WeatherElement,
  moment: "day" | "night" | null,
  fetchData: () => void,
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
}

interface WeatherElement {
  observationTime: Date;
  locationName: string;
  humid: number;
  temperature: number;
  windSpeed: number;
  description: string;
  weatherCode: number;
  rainPossibility: number;
  comfortability: string;
  isLoading: boolean;
}

const WeatherCard = (props: WeatherCardProps) => {
  const { weatherElement, moment, fetchData, setCurrentPage, cityName, } = props;

  const {
    observationTime,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  return (
    <WeatherCardWrapper>
      <Cog onClick={() => setCurrentPage("WeatherSetting")} />
      <Location>{cityName}</Location>
      <Description>
        {description} {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>??C</Celsius>
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
        ?????????????????????
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(observationTime))}{' '}
        {isLoading ? <LoadingIcon /> : <RedoIcon />}
      </Refresh>
    </WeatherCardWrapper>
  )
}

export default WeatherCard;