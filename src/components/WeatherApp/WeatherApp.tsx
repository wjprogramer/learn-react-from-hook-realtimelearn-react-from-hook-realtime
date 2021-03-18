import styled from '@emotion/styled';

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
  font-size: 50px;
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
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
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
  return (
    <Container>
      <Content>

        {/* Title */}
        <Title>Weather</Title>

        {/* Main Info */}
        <div style={{ flexGrow: 1 }}>
          <WeatherCard>
            <Location>台北市</Location>
            <Description>多雲時晴</Description>
            <CurrentWeather>
              <Temperature>
                23 <Celsius>°C</Celsius>
              </Temperature>
            </CurrentWeather>
            <AirFlow>23 m/h</AirFlow>
            <Rain>48%</Rain>
          </WeatherCard>
        </div>

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