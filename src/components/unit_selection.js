import React from "react";
import '../stylesheets/unit_selection.css';

function UnitSelection({ onUnitChange, unitsValue }){

	function handleUnitSelection(e){
		const unit = e.target.value;

			if(unit === 'metric'){
				onUnitChange('metric');
			}
			else if(unit === 'imperial'){
				onUnitChange('imperial');
			}
			else if(unit === 'standard'){
				onUnitChange('standard');
			}
	}

  return(
		<select className="form-select unit-selection border border-primary-subtle" onChange={handleUnitSelection} value={unitsValue}>
			<option value={'metric'}>Celsius</option>
			<option value={'imperial'}>Farenheit</option>
			<option value={'standard'}>Kelvin</option>
		</select>
  );

}

export default UnitSelection;