import styled from '@emotion/styled';

import { ReactComponent as CloudyIcon } from '../../../assets/image/weather-app-images/day-cloudy.svg';

const IconContainer = styled.div`
  flex-basis: 30%;

  svg {
    max-height: 110px;
  }
`;

const WeatherIcon = () => {
  return (
    <IconContainer>
      <CloudyIcon />
    </IconContainer>
  );
}

export default WeatherIcon;