import './App.css';
import "./stylesheets/input.css";
import React, { useState, useEffect } from 'react';
import Header from './components/header.js';
import Weather from './components/weather.js';
import Input from './components/input.js';

function App() {

  const apiKey = '68b7dbce6dc6442cd77d180b9c26026d';
  const input = 'Caracas';

  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [dateHook, setDate] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [feels_like, setFeelsLike] = useState('');
  const [weather, setWeather] = useState('');

  const handleCity = (cityValue) => {
    getLatLonUser(cityValue);
  }

  const getLatLonUser = (cityValue) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      let country = data[0].country;
      let city = data[0].name;
      let lat = data[0].lat;
      let lon = data[0].lon;

      setCountry(`${city} ${country}`);

      getTemperature(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

    })
    .catch(error => console.log(error))
  }

  const getLatLon = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      let country = data[0].country;
      let city = data[0].name;
      let lat = data[0].lat;
      let lon = data[0].lon;

      setCountry(`${city} ${country}`);

      getTemperature(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

    })
    .catch(error => console.log(error))
  }

  const getDate = () => {
    const date = new Date();

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const daysWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let monthName = months[date.getMonth()];
    let weekDay = daysWeek[date.getDay()];
    let day = date.getDate();

    setDate(`${day} ${weekDay} ${monthName}`);
  }

  const getTemperature = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        getDate();

        let temp_min = Math.trunc(data.main.temp_min);
        let temp_max = Math.trunc(data.main.temp_max);
        let feels = Math.trunc(data.main.feels_like);

        setFeelsLike(`Feels like ${feels}ºC`);
        setMin(`Min: ${temp_min}ºC`);
        setMax(`Max: ${temp_max}ºC`);
        setTemperature(Math.trunc(data.main.temp)+'ºC');
        setWeather(data.weather[0].main);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  };

  useEffect(() => {
    getLatLon();
  }, []);

  return (
    <div className="App">
      <Header />
      <Input onCitySubmit={handleCity} />
      <Weather
        country={country}
        temperature={temperature}
        date={dateHook}
        feels_like={feels_like}
        weather={weather}
        min={min}
        max={max}
      />
    </div>
  );
}

export default App;
