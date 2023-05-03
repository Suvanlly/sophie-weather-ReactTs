import styled from "styled-components";

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 10%;
  border-radius: 10px;
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 30px;
  }
  &:last-child {
    margin-right: 30px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const SmallLabel = styled.h4`
  color: #ffffff;
  display: block;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  padding: 5px 0;
`;

const ForecastDay = (props: { temp: number; icon: string; main: string; date: number }) => {
  const { temp, icon, main, date } = props;
  // console.log(date);
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const humanDate = new Date(date * 1000).toLocaleString("en-gb").slice(0, 10);
  // console.log(humanDate);
  return (
    <ForecastWrapper>
      <WeatherIcon src={iconURL} />
      <SmallLabel>{humanDate}</SmallLabel>
      <SmallLabel>{temp}&#176;C</SmallLabel>
      <SmallLabel>{main}</SmallLabel>
    </ForecastWrapper>
  );
};

export default ForecastDay;
