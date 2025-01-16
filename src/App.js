import './App.css';
import "./stylesheets/input.css";
import sun from './images/sunny.png';
import sunClouds from './images/sun_clouds.png';
import cloud from './images/clouds.png';
import cloudRain from './images/cloud_rain.webp';
import cloudThunder from './images/cloud_thunder.webp';
import snowflake from './images/snowflake.png';
import mist from './images/mist.png';
import moon from './images/night.png';
import moonCloud from './images/night_cloud.png';
import moonRain from './images/night_rain.png';
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
  const [w_icon, setWeatherIcon] = useState('');

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

    setDate(`${weekDay}, ${monthName} ${day}`);
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
        
        const icon = data.weather[0].icon;
        
        if(icon === '01d'){
          setWeatherIcon(sun);
        }
        else if(icon === '01n'){
          setWeatherIcon(moon);
        }
        else if(icon === '02d'){
          setWeatherIcon(sunClouds);
        }
        else if(icon === '02n'){
          setWeatherIcon(moonCloud);
        }
        else if(icon === '04d' || icon === '03d' || icon === '04n' || icon === '03n'){
          setWeatherIcon(cloud);
        }
        else if(icon === '09d' || icon === '10d' || icon === '09n' || icon === '10n'){
          setWeatherIcon(cloudRain);
        }
        else if(icon === '11d' || icon === '11n'){
          setWeatherIcon(cloudThunder);
        }
        else if(icon === '13d' || icon === '13n'){
          setWeatherIcon(snowflake);
        }
        else if(icon === '50d' || icon === '50n'){
          setWeatherIcon(mist);
        }

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
        w_icon={w_icon}
      />
    </div>
  );
}

export default App;
