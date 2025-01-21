import React from "react";
import '../stylesheets/footer.css';

function Footer(props){

  return(
    <footer className="mt-5 p-3 bg-primary-subtle border border-primary-subtle p-2">
      <p>&copy; {props.rights}</p>
      <p>{props.contact}</p>
      <a className="mx-1" href="https://linkedin.com/in/miguel-david-raaz-barajas-88249b348">LinkedIn</a>
      <a className="mx-1" href="https://github.com/Miguensio">GitHub</a>
    </footer>
  );

}

export default Footer;