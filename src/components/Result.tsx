import styled from "styled-components";
import ForecastDay from "./ForecastDay";

const OutputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 70px auto;
  color: #ffffff;
  text-align: center;
`;
const LocationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 100%;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const CityName = styled.p`
  font-size: 60px;
  font-weight: 800;
  padding-bottom: 30px;
`;
const Date = styled.p`
  font-size: 30px;
  font-weight: 700;
`;
const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const Temp = styled.p`
  font-size: 70px;
  font-weight: 800;
  font-family: "Merriweather", serif;
  padding-bottom: 30px;
`;
const Description = styled.p`
  font-size: 30px;
  padding-bottom: 10px;
`;
const TempRange = styled.p`
  font-size: 20px;
  font-family: "Merriweather", serif;
`;
const IconWrapper = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const ForecastWrapper = styled.div`
  border-radius: 10px;
  flex-basis: 100%;
  margin: 20px auto;
  overflow: hidden;
`;
const Day7 = styled.p`
  font-size: 25px;
  text-align: center;
  padding-bottom: 10px;
  color: #ffffff;
  font-weight: 800;
`;
const Forecast = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  overflow-y: hidden;
  scrollbar-width: thin;
  margin-top: 30px;
  padding-bottom: 20px;
`;

type WeatherType = {
  cityName: string;
  date: string;
  temp: number;
  description: string;
  temp_min: number;
  temp_max: number;
  icon: string;
  forecastDaily: Array<{
    temp: { day: any };
    weather: {
      icon: any;
      main: any;
    }[];
    dt: any;
  }>;
};

const Result = ({ weather }: { weather: WeatherType }) => {
  const {
    cityName,
    date,
    temp,
    description,
    temp_min,
    temp_max,
    icon,
    forecastDaily,
  } = weather;

  const forecast = forecastDaily.map(
    (
      item, index
    ) => {
      if (index !== 0) {
        return (
          <ForecastDay
            key={item.dt} 
            temp={item.temp.day}
            icon={item.weather[0].icon}
            main={item.weather[0].main}
            date={item.dt}
          />
        );
      }
      return null;
    }
  );

  return (
    <>
      <OutputWrapper>
        <LocationWrapper>
          <CityName>{cityName}</CityName>
          <Date>{date}</Date>
        </LocationWrapper>
        <IconWrapper src={icon} /> {/* fixed: removed unnecessary curly braces */}
        <CurrentWeatherWrapper>
          <Temp>{temp}°C</Temp>
          <Description>{description}</Description>
          <TempRange>
            {temp_min}°C ~ {temp_max}°C
          </TempRange>
        </CurrentWeatherWrapper>
      </OutputWrapper>
      <ForecastWrapper>
        <Day7>Next 7 Days Forecast</Day7>
        <Forecast>{forecast}</Forecast>
      </ForecastWrapper>
    </>
  );
};

export default Result;