import styled from '@emotion/styled';

import WeatherIcon from "./WeatherIcon";
import { ThemeType } from "../theme";

const Container = styled.div`
  background-color: ${({ theme }: { theme: any }) => theme.backgroundColor};
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
  color: ${props => props.theme === ThemeType.DARK ? '#dadada' : '#212121'};
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

const LicenseContainer = styled.div`
  width: 100%;
  display: block;
  margin: auto;
  text-align: left;
  padding: 16px;
  color: #707070;
`

const License = () => {
  return <LicenseContainer>
    <Table>
      <tbody>
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
      </tbody>
    </Table>
  </LicenseContainer>
}

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

export {
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
  Link,
  Table,
}