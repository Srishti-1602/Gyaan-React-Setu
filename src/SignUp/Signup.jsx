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
<div className='inforec'>
          <label className='school'>
            
            <input type="text" name="username" placeholder='Username'/>
          </label>
          <br />
         
              <label className='school'>
            <input type="email" name="email" placeholder='Email'/>
          </label>
          <br />
             <label className='school'>
            
            <input type="password" name="password" placeholder='Password'/>

          </label>
          <br />
             <label className='school'>
            
            <input type="text" name="course" placeholder='School'/>
          </label>
          <br />
          <label className='school'>
            
            <input type="text" name="course" placeholder='Course'/>
          </label>
          <br />
             <label className='school'>
            
            <input type="text" name="course" placeholder='Department'/>
          </label>
          <br />
          <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
    </div>
</>
  );
}

export default LogIn;