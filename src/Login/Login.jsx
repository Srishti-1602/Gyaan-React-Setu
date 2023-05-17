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
    
<div className='App'>
   <img className='JoinImg' src={logimg} alt='Logo'/>
      <div className='Info'>
        <h3 className='welcome'>Welcome to</h3>
        <h3 className='gyaan'>Gyaan Setu</h3>
        <p className='Para'>add the form</p>

<p className='Para1'>Don't have an account? <span onClick={handleSignUpClick} style={{color: 'yellow', cursor: 'pointer'}}>Sign Up</span>
</p>
      </div>
     
    </div>
    </div>
</>
  );
}

export default LogIn;