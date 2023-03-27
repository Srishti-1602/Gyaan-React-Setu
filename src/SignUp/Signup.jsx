import React from 'react';
import './signup.css';
// import logo from '../Images/Gyaan setu.png';
import signimg from '../Images/5066999.jpg';
// import React, { useState } from "react";

function LogIn() {


  return (
    <>
    <div className="App">
      <div className="image-container">
        <img src={signimg} alt="MySign" className='imglog'/>
      
      </div>
      <div className="signup-container">
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
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
</>
  );
}

export default LogIn;