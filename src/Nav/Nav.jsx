/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import logo from '../Images/Gyaan setu.png';
import './nav.css';

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

//   const loginSignStyle = {
//     color: '#000',
//     fontSize: '17px',
//     cursor: 'pointer',
//     textAlign: 'center',
//   };

  function clickAlert() {
    alert("The how-it-works button was clicked!");
  }

  function handleCommunitiesClick() {
    // Handle communities click event
    window.location.href = 'Community/community.html';
  }

  function handleContributeClick() {
    // Handle contribute click event
    clickAlert();
  }

  function handleHowItWorksClick() {
    // Handle how it works click event
    clickAlert();
  }

  // function handleLoginClick() {
  //   // Handle login click event
  //   clickAlert();
  // }

  return (
  <div className="background">
    <nav className="navbar navbar-expand-xl navbar-dark" style={navbarStyle}>
      <div className="container-fluid">
        <div className="gyansetu">
          <a className="navbar-brand" href="index.html">
            <img className='Gyaanlogo' src={logo}/>
          </a>
          <a className="headgyaaaan" href="index.html">
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
            <li className="nav-item">
              <a
                className="nav-link"
                style={navLinkStyle}
                onClick={handleCommunitiesClick}>
                Communities
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={navLinkStyle}
                onClick={handleContributeClick}>
                Contribute
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={navLinkStyle}
                onClick={handleHowItWorksClick}>
                How it works?
              </a>
            </li>
            <li className="nav-item" id="profile-pic" style={profilePicStyle}>
              <a
                className="nav-link"
                href="Dashboard/dashboard.html"
                style={navLinkStyle}
              >
                <img className="profilephoto" />
              </a>
            </li>
            <li className="nav-item" id="li-login" style={profilePicStyle}>
              <a
								class="nav-link"
								href="Dashboard/dashboard.html"
								// style='color: #fff; font-size: 20px; text-align: center'
                                >
                                <img class="profilephoto" /></a></li>
						<li
							class="nav-item"
							id="li-login"
							// style="display: none; text-align: center"
							><a
								class="nav-link login-sign"
								id="signup-button"
								// style="color: #000; font-size: 17px; cursor: pointer; text-align: center;"
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