import React from "react";
import '../stylesheets/language_selection.css';

function LanguageSelection({ language, onLanguageChange }){

  function handleLangSelection(e){
		const lang = e.target.value;

			if(lang === 'en'){
				onLanguageChange('en');
			}
			else if(lang === 'es'){
				onLanguageChange('es');
			}
	}

  return(
    <select className="mx-1 form-select lang-selection border border-primary-subtle" value={language} onChange={handleLangSelection}>
      <option value='en'>EN</option>
      <option value='es'>ES</option>
    </select>
  );

}

export default LanguageSelection;