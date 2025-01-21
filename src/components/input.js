import React from "react";

function Input({ onCitySubmit }){

	const userInput = () => {
		const city = document.getElementById("input").value;
		onCitySubmit(city);
	}

  return(
    <div className="input-group p-4 w-50 m-auto input-container">
        <input type="text" id="input" className="city-input form-control text-center bg-primary-subtle" placeholder="Input the city of your choice"/>
				<div className="input-group-btn">
					<button className="btn btn-default bg-primary-subtle mx-2" onClick={userInput}>
						Search
					</button>
				</div>
    </div>
  );

}

export default Input;