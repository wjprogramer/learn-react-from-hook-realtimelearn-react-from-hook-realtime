import styled from '@emotion/styled';

import { ThemeType } from "../theme";
import WeatherCard from "./WeatherCard";

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
  License,
  Link,
  Table,
}