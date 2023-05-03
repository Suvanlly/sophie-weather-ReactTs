import React, { useState } from 'react';
import styled from 'styled-components';
import Result from './components/Result';
import NotFound from './components/NotFound';

const AppTitle = styled.h3`
  color: #ffffff;
  opacity: 1;
  height: auto;
  margin-top: 100px;
  font-size: 50px;
  text-align: center;
  transition: all .3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`
const InputWrapper = styled.form`
  text-align: center;
  margin-top: 50px;
  height: 50px;
`
const SearchInput = styled.input`
  font-size: 18px;
  width: 250px;
  border-radius: 10px;
  border: none;
  height: 50px;
  margin-right: 10px;
  padding: 10px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }
`
const SearchButton = styled.button`
  height: 50px;
  width: 100px;
  line-height: 50px;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

interface WeatherInfo {
  date: string;
  cityName: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
  forecastDaily: any[]; 
}


const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const [error, setError] = useState(false);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const searchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputValue;
    const geoAPIkey = 'AIzaSyBjoZIOKg9rrHX3UXgMf1YmvBpfTGT7puM';
    const googleSource = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${geoAPIkey}`;

    try {
      const response = await fetch(googleSource);
      const googleData = await response.json();
      const lat = googleData.results[0].geometry.location.lat;
      const lng = googleData.results[0].geometry.location.lng;
      const APIkey = '638d3030eafa245040554df387be8a9c';
      const weatherSource = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${APIkey}`;

      const weatherResponse = await fetch(weatherSource);
      const weatherData = await weatherResponse.json();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const currentDate = new Date();
      const date = `${days[currentDate.getDay()]} ${
        currentDate.getDate()
      } ${months[currentDate.getMonth()]}`;
      const iconId = weatherData.current.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
      const weatherInfo = {
        date: date,
        cityName: weatherData.timezone,
        temp: weatherData.current.temp,
        temp_max: weatherData.daily[0].temp.max,
        temp_min: weatherData.daily[0].temp.min,
        description: weatherData.current.weather[0].description,
        icon: iconURL,
        forecastDaily: weatherData.daily,
      };
      setWeatherInfo(weatherInfo);
      setWeatherDisplay(true);
      setError(false);
    } catch (error) {
      setError(true);
      setWeatherDisplay(false);
    }
  };

  return (
    <>
      <AppTitle>Sophie's Weather</AppTitle>
      <InputWrapper onSubmit={searchWeather}>
        <SearchInput
          value={inputValue}
          placeholder="Enter the City Name..."
          onChange={inputChange}
        />
        <SearchButton>Search</SearchButton>
      </InputWrapper>
      {weatherInfo && weatherDisplay && <Result weather={weatherInfo} />}
      {error && <NotFound />}
    </>
  );
};

export default App;