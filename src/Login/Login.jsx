import React from 'react';
import './login.css';
// import logo from '../Images/Gyaan setu.png';
import logimg from '../Images/6059971.jpg';
// import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


function LogIn() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); // Assuming you have initialized the Firebase app properly

    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful Google sign-in here
        console.log(result.user);
      })
      .catch((error) => {
        // Handle Google sign-in error here
        console.log(error);
      });
  };

  return (
    <>
      <div className="back">
        <div className='App'>
          <img className='JoinImg' src={logimg} alt='Logo' />
          <div className='Info'>
            <h3 className='welcome'>Welcome to</h3>
            <h3 className='gyaan'>Gyaan Setu</h3>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            <p className='Para1'>Don't have an account? <span onClick={handleSignUpClick} style={{ color: 'yellow', cursor: 'pointer' }}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


export default LogIn;