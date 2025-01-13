import React from "react";

function Header(){

  return(
    <header className="bg-primary-subtle border border-primary-subtle p-2">
        <nav className="navbar d-inline-flex">
          <a className="nav-link p-2" href="#">Home</a>
          <a className="nav-link p-2" href="#">Contact</a>
        </nav>
    </header>
  );

}

export default Header;