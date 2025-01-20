import React from "react";
import '../stylesheets/error_message.css'

function ErrorMessage(props){

  return(
    <div className="error-message-container">
      <div className="error-message-content">
        <p className="fw-bold">{props.message}</p>
      </div>
    </div>
  );

}

export default ErrorMessage;