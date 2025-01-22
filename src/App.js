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
import Footer from './components/footer.js';
import Weather from './components/weather.js';
import Input from './components/input.js';
import Loading from './components/loading.js';
import UnitSelection from './components/unit_selection.js';
import LanguageSelection from './components/language_selection.js';
import ErrorMessage from './components/error_message.js';

function App() {
  const [mounted, isMounted] = useState(false);
  const errorRef = useRef(null);

  const apiKey = '68b7dbce6dc6442cd77d180b9c26026d';
  const input = 'Orlando';

  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [dateHook, setDate] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [feels_like, setFeelsLike] = useState('');
  const [weather, setWeather] = useState('');
  const [w_icon, setWeatherIcon] = useState(null);
  const [description, setDescription] = useState('');
  const [inputtedCity, setCity] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoadingState] = useState(false);
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorExists, setError] = useState(false);
  const [contact, setContact] = useState('Contact: miguelraazbarajas@gmail.com');
  const [rights, setRights] = useState('2025 Miguel Raaz. All rights reserved.');
  const [placeholderText, setPlaceholder] = useState('Input a city');

  //function to handle user city input
  const handleCity = (cityValue) => {
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
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputtedCity}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if(data.length === 0){
        console.log("City not found");
        if(language === 'en'){
          setErrorMessage("The city you introduced could not be found, check and try again");
          setError(true);
          setLoadingState(false);
          return
        }
        else if(language === 'es'){
          setErrorMessage("La ciudad que introdujo no se pudo encontrar, revise e intente de nuevo");
          setError(true);
          setLoadingState(false);
          return
        }
      }

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
      if(language === 'en'){
        setErrorMessage("There was an error fetching the city introduced, please try again");
        setError(true);
      }
      else if(language === 'es'){
        setErrorMessage("Hubo un error obteniendo la ciudad que introdujo, por favor intente de nuevo");
        setError(true);
      }
      console.error(error);
      setLoadingState(false);
    })
  }

  //function to get latitude and longitude of the inputted city
  const getLatLon = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      
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
      if(language === 'en'){
        setErrorMessage("There was an error fetching the location's data, please try again");
        setError(true);
      }
      else if(language === 'es'){
        setErrorMessage("Hubo un error obteniendo los datos del lugar, por favor intente de nuevo");
        setError(true);
      }
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
      setDate(`${weekDay}, ${day} de ${monthName}`);
    }
  }

  //function to get the weather
  const getWeather = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
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
        if(language === 'en'){
          setErrorMessage("There was an error fetching the weather data, please try again");
          setError(true);
        }
        else if(language === 'es'){
          setErrorMessage("Hubo un error obteniendo los datos del clima, por favor intente de nuevo");
          setError(true);
        }
        console.error('Error fetching weather data:', error);
        setLoadingState(false);
      });
  };

  //get geolocation on load
  useEffect(() => {
    setLoadingState(true);
    getLatLon();
  }, []);

  //when the user changes the units, getWeather gets called with the new units value
  useEffect(() => {
    if(mounted){
      getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${language}`);
    }
  }, [units]);

  //when the user inputs a city and the useEffect hook changes, proceeds to get all relevant info
  useEffect(() => {
    if(mounted){
      console.log(inputtedCity);
      if(inputtedCity === ''){
        if(language === 'es'){
          setErrorMessage("No deje el campo de ciudad vacío");
          setError(true);
        }
        else if(language === 'en'){
          setErrorMessage("The city input has no value");
          setError(true);
        }
      }
      else{
        setLoadingState(true);
        getLatLonUser();
      }
    }
  }, [inputtedCity]);

  //when the user changes language all text gets changed
  useEffect(() => {
    if(mounted){
      if(language === 'en'){
        setContact('Contact: miguelraazbarajas@gmail.com');
        setRights('2025 Miguel Raaz. All rights reserved.');
        setPlaceholder('Input a city');
      }
      else if(language === 'es'){
        setContact('Contacto: miguelraazbarajas@gmail.com');
        setRights('2025 Miguel Raaz. Todos los derechos reservados.');
        setPlaceholder('Introduzca una ciudad');
      }
      getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${language}`);
    }
  }, [language]);

  //shows an error message for 5 seconds when an error occurs
  useEffect(() => {
    if(mounted && errorExists === true){
      if(errorRef.current){
        errorRef.current.classList.remove('hide');
        setTimeout(()=>{
          errorRef.current.classList.add('hide');
          setError(false);
        },5000)
      }
    }
  }, [errorExists]);

  //control useEffect so other useEffects aren't executed on load
  useEffect(() => {
    isMounted(true);
  });
  
  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Input 
          onCitySubmit={handleCity}
          placeholderText={placeholderText} />

          <div className='selections'>
            <UnitSelection 
            onUnitChange={changeUnit}
            unitsValue={units} />

            <LanguageSelection
            onLanguageChange={changeLanguage}
            language={language} />
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
            w_icon={w_icon} />

          <Footer
          rights={rights}
          contact={contact} />

          <div className='error-area hide' ref={errorRef}>
            <ErrorMessage
            message={errorMessage} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
