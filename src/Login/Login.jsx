import React from 'react';
import './login.css';
// import logo from '../Images/Gyaan setu.png';
import logimg from '../Images/6059971.jpg';
// import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LogIn() {
const navigate = useNavigate();

const handleSignUpClick = () => {
        navigate('/SignUp');
  };

  return (
    <>
    <div className="back">
    <div className="App">
      <div className="image-container">
        <img src={logimg} alt="Mylogin" className='imglog'/>
      
      </div>
      <div className="login-container">
        {/* <div>
          <h2>Welcome</h2>
      </div> */}
        <form>
          <h2 className='welcome'>Welcome to</h2>
          
          <h1 className='gyaan'>Gyaan Setu</h1>
          <label >
            Username:
            <input type="text" name="username" className='textinput' />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">Log In</button>
        </form>
<span style={{color: 'white'}}>Don't have an account?</span><span onClick={handleSignUpClick} style={{color: 'white'}}>Sign Up</span>
      </div>
    </div>
    </div>
</>
  );
}

export default LogIn;