/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import logo from '../Images/Gyaan setu.png';
import './nav.css';
// import { useHistory } from 'react-router-dom';
// import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    backgroundColor: '#0F1E31',
    top: '-23px',
  };

  const navLinkStyle = {
    color: '#fff',
    fontSize: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };

  const profilePicStyle = {
    display: 'none',
  };




  return (
  <div className="background">
    <nav className="navbar navbar-expand-xl navbar-dark" style={navbarStyle}>
      <div className="container-fluid">
        <div className="gyansetu">
          <a className="navbar-brand" href="/">
            <img className='Gyaanlogo' src={logo}/>
          </a>
          <a className="headgyaaaan" href="/">
            {/* <span className="headgyaan">GYAAN&nbsp;</span> */}
            <span className="headsetu">GYAAN SETU</span>
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item" style={navLinkStyle}>    
              <a
                className="nav-link"
                style={navLinkStyle}
                href="/community">
                Communities
              </a>
            {/* <Link to="/community" >Community</Link> */}
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={navLinkStyle}
                href="/">
                Contribute
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={navLinkStyle}
                href="/">
                How it works?
              </a>
            </li>
          
            <li className="nav-item" id="li-login" style={profilePicStyle}>
              <a
								className="nav-link"
								href="/dashboard"
								// style='color: #fff; font-size: 20px; text-align: center'
                                >
                                <img className="profilephoto" /></a></li>
						<li
							className="nav-item"
							id="li-login"

							><a
								className="nav-link login-sign"
								id="signup-button"
						
								>Log out
							</a></li>
					</ul>
				</div>
			</div>
		</nav>  
</div>
  );
}

export default Navbar;