import React from 'react';
import './signup.css';
// import logo from '../Images/Gyaan setu.png';
import signimg from '../Images/5066999.jpg';
// import React, { useState } from "react";
import handleSignUp from './signUpUtil';

function LogIn() {
  return (
    <>
    <div className="back">
    <div className="App">
      <div className="image-container">
        <img src={signimg} alt="MySign" className='imglog'/>
      
      </div>
      <div className="signup-container">
        {/* <div>
          <h2>Welcome</h2>
      </div> */}
        <form onSubmit={handleSignUp}>
          <h2 className='welcome'>Welcome to</h2>
          
          <h1 className='gyaan'>Gyaan Setu</h1>
          <label >
            Username:
            <input type="text" name="username" className='username' />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
             <label className='school'>
            School:
            <input type="text" name="school" />
          </label>
          <br />
             <label className='school'>
            Course:
            <input type="text" name="course" />
          </label>
          <br />
          <label className='school'>
            Department:
            <input type="text" name="department" />
          </label>
          <br />
             <label className='email'>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
    </div>
</>
  );
}

export default LogIn;