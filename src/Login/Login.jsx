import React, { useEffect } from 'react';
import './login.css';
// import logo from '../Images/Gyaan setu.png';
import logimg from '../Images/6059971.jpg';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import firebase from 'firebase/app';
import 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui';

function Login() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: '/SignUp', // Redirect URL after successful sign-in
      signInFlow: 'popup', // Display a pop-up window for sign-in
      signInOptions: [
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            prompt: 'select_account',
          },
        },
      ], // Enable Google sign-in only
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          const user = authResult.user;
          const userId = user.uid;

          // Check if the user exists in the 'users' node of the Realtime Database
      const database = getDatabase();
      const userRef = ref(database, `users/${userId}`);

      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        if (userData) {
          // User exists in the database
          if (userData.registered === false) {
            navigate('/SignUp');
          } else {
            navigate('/index');
          }
        } else {
          // User doesn't exist in the database, set the registration value to false
          set(userRef, { registered: false })
            .then(() => {
              console.log('User added successfully.');
              navigate('/SignUp');
            })
            .catch((error) => {
              console.error('Error adding user:', error);
            });
        }
      });

          //navigate('/SignUp'); // Redirect to the signup page
          return false; // Avoid redirecting automatically
        },
        signInFailure: (error) => {
          // Handle sign-in failure scenarios
          console.error(error);
        },
      },
    };

    const auth = getAuth();
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);
  }, [navigate]);

  return (
    <>
      <div className="back">
        <div className='App'>
          <img className='JoinImg' src={logimg} alt='Logo' />
          <div className='Info'>
            <h3 className='welcome'>Welcome to</h3>
            <h3 className='gyaan'>Gyaan Setu</h3>
            <div id="firebaseui-auth-container"></div>
            <p className='Para1'>
              Don't have an account?{' '}
              <span onClick={handleSignUpClick} style={{ color: 'yellow', cursor: 'pointer' }}>
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;