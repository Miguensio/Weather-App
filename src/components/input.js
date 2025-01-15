import React from "react";

function Input(){

  return(
    <div className="input-group p-4 w-50 m-auto input-container">
        <input type="text" className="form-control text-center bg-primary-subtle" placeholder="Input the city of your choice"/>
				<div className="input-group-btn">
					<button className="btn btn-default bg-primary-subtle mx-2">
						Search
					</button>
				</div>
    </div>
  );

}

export default Input;