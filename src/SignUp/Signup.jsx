import React from 'react';
import './signup.css';
// import logo from '../Images/Gyaan setu.png';
import signimg from '../Images/5066999.jpg';
// import React, { useState } from "react";
import handleSignUp from './signUpUtil';

function LogIn() {
  return (
    <>
    <div className="backsign">
    <div className='App'>
   <img className='JoinImg' src={signimg} alt='Logo'/>
      <div className='Info'>
        <h3 className='welcome'>Welcome to</h3>
        <h3 className='gyaan'>Gyaan Setu</h3>
      <form>
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
          <button type="submit" onClick={handleSignUp}>Sign Up</button>
        <p className='Para1'>Already have an account? <span style={{color: 'yellow', cursor: 'pointer'}}>Login In</span></p>
      </form>
          </div>


      </div>
     
    </div>
</>
  );
}

export default LogIn;