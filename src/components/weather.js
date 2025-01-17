import React from "react";

function Weather(props){

  return(
    <div className="d-flex justify-content-center">
      <div className="container text-center my-3">
        <p className="fs-3 text-white fw-medium">{props.country}</p>
        <p className="fs-6 text-white">{props.date}</p>
        <div className="d-flex align-items-center justify-content-center">
          <img className="weather-icon" src={props.w_icon}/>
          <p className="fs-1 fw-bold text-white mx-2">{props.temperature}<br></br>{props.weather}</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="fs-3 text-white px-3">{props.min}</p>
          <p className="fs-3 text-white px-3">{props.max}</p>
        </div>
        <p className="fs-3 text-white">{props.feels_like}</p>
      </div>
    </div>
  );

}

export default Weather;