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
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/header.js';
import Weather from './components/weather.js';
import Input from './components/input.js';
import Loading from './components/loading.js';
import UnitSelection from './components/unit_selection.js';
import LanguageSelection from './components/language_selection.js';

function App() {
  const hasMounted = useRef(false);

  const apiKey = '68b7dbce6dc6442cd77d180b9c26026d';
  const input = 'Orlando';

  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [dateHook, setDate] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [feels_like, setFeelsLike] = useState('');
  const [weather, setWeather] = useState('');
  const [w_icon, setWeatherIcon] = useState('');
  const [description, setDescription] = useState('');
  const [inputtedCity, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoadingState] = useState(false);
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('en');

  //function to handle user city input
  const handleCity = (cityValue) => {
    setLoadingState(true);
    setCity(cityValue);
  }

  const changeUnit = (unitValue) => {
    setUnits(unitValue);
  }

  const changeLanguage = (langValue) => {
    setLanguage(langValue);
  }

  //function to get the weather in the city the user inputted
  const getLatLonUser = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputtedCity}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      let country = data[0].country;
      let city = data[0].name;
      let lat = data[0].lat;
      let lon = data[0].lon;
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);

      setCountry(`${city} ${country}`);

      getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`);

    })
    .catch(error => {
      console.error(error);
      setLoadingState(false);
    })
  }

  //function to get latitude and longitude of the inputted city
  const getLatLon = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      let country = data[0].country;
      let city = data[0].name;
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);

      setCountry(`${city} ${country}`);

      getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${language}`);

    })
    .catch(error => {
      console.error(error);
      setLoadingState(false);
    })
  }

  //function to get the weather in the geolocation of the user visitting the app
  function getUserLocation(lat, lon){
    getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`);
  }

  const getDate = () => {
    const date = new Date();

    if(language === 'en'){
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const daysWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      let monthName = months[date.getMonth()];
      let weekDay = daysWeek[date.getDay()];
      let day = date.getDate();
      setDate(`${weekDay}, ${monthName} ${day}`);
    }
    else if(language === 'es'){
      const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      const daysWeek = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
      let monthName = months[date.getMonth()];
      let weekDay = daysWeek[date.getDay()];
      let day = date.getDate();
      setDate(`${weekDay}, ${monthName} ${day}`);
    }
  }

  //function to get the weather
  const getWeather = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        getDate();

        let temp_min = Math.trunc(data.main.temp_min);
        let temp_max = Math.trunc(data.main.temp_max);
        let feels = Math.trunc(data.main.feels_like);

        if(units === 'metric'){
          if(language === 'es'){
            setFeelsLike(`Sensación: ${feels}ºC`);
            setMin(`Min: ${temp_min}ºC`);
            setMax(`Max: ${temp_max}ºC`);
            setTemperature(Math.trunc(data.main.temp)+'ºC');
          }
          else if(language === 'en'){
            setFeelsLike(`Feels like ${feels}ºC`);
            setMin(`Min: ${temp_min}ºC`);
            setMax(`Max: ${temp_max}ºC`);
            setTemperature(Math.trunc(data.main.temp)+'ºC');
          }
        }
        else if(units === 'imperial'){
          if(language === 'es'){
            setFeelsLike(`Sensación: ${feels}ºF`);
            setMin(`Min: ${temp_min}ºF`);
            setMax(`Max: ${temp_max}ºF`);
            setTemperature(Math.trunc(data.main.temp)+'ºF');
          }
          else if(language === 'en'){
            setFeelsLike(`Feels like ${feels}ºF`);
            setMin(`Min: ${temp_min}ºF`);
            setMax(`Max: ${temp_max}ºF`);
            setTemperature(Math.trunc(data.main.temp)+'ºF');
          }
        }
        else if(units === 'standard'){
          if(language === 'es'){
            setFeelsLike(`Sensación: ${feels}ºK`);
            setMin(`Min: ${temp_min}ºK`);
            setMax(`Max: ${temp_max}ºK`);
            setTemperature(Math.trunc(data.main.temp)+'ºK');
          }
          else if(language === 'en'){
            setFeelsLike(`Feels like ${feels}ºK`);
            setMin(`Min: ${temp_min}ºK`);
            setMax(`Max: ${temp_max}ºK`);
            setTemperature(Math.trunc(data.main.temp)+'ºK');
          }
        }

        if(language === 'es'){
          setDescription(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
          if(data.weather[0].main === 'Clouds'){
            setWeather('Nubes');
          }
          else if(data.weather[0].main === 'Clear'){
            setWeather('Despejado');
          }
          else if(data.weather[0].main === 'Mist'){
            setWeather('Neblina');
          }
          else if(data.weather[0].main === 'Snow'){
            setWeather('Nieve');
          }
          else if(data.weather[0].main === 'Rain'){
            setWeather('Lluvia');
          }
          else if(data.weather[0].main === 'Drizzle'){
            setWeather('Llovizna');
          }
          else if(data.weather[0].main === 'Thunderstorm'){
            setWeather('Tormenta');
          }
        }
        else if(language === 'en'){
          setDescription(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
          setWeather(data.weather[0].main);
        }
        
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

        setLoadingState(false);

      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoadingState(false);
      });
  };

  useEffect(() => {

    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setLoadingState(true);
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              console.log('geolocalización: ', data);
              setCountry(data.display_name);
              getUserLocation(latitude, longitude);
            })

            .catch((error) => {
              console.log(error);
              setLoadingState(false);
            });

        },
        (error) => console.log(error)
      );
    } 
    else{
      console.log("el usuario no posee geolocalización");
      setLoadingState(true);
      getLatLon();
    }

  }, []);

  useEffect(() => {
    console.log(units);
    if(hasMounted.current){
      getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${language}`);
    }
    else{
      hasMounted.current = true;
    }
  }, [units]);

  useEffect(() => {
    console.log(inputtedCity);
    if(hasMounted.current){
      getLatLonUser();
    }
    else{
      hasMounted.current = true;
    }
  }, [inputtedCity]);

  useEffect(() => {
    console.log(language);
    if(hasMounted.current){
      getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${language}`);
    }
    else{
      hasMounted.current = true;
    }
  }, [language]);
  
  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <Input onCitySubmit={handleCity} />
          <div className='selections'>
            <UnitSelection 
            onUnitChange={changeUnit}
            unitsValue={units}/>

            <LanguageSelection
            onLanguageChange={changeLanguage}
            language={language}/>
          </div>
          <Weather
            country={country}
            temperature={temperature}
            date={dateHook}
            description={description}
            feels_like={feels_like}
            weather={weather}
            min={min}
            max={max}
            w_icon={w_icon}
          />
        </>
      )}
    </div>
  );
}

export default App;
