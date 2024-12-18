/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import React from 'react'
// import MainOld from './Main/MainOld'
import Main from './Main/Main'
import Start from './FirstPage/First'
import Community from './Community/Community'
import Dash from './Dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import ErrorBoundary from './error/errorBound';
import LogIn from './Login/Login'
import SignUp from './SignUp/Signup'

function App () {
  // const user= false;
  return (
    <div>
      {/* <LogIn /> */}
      {/* <Main /> */}
      {/* <SignUp /> */}
      {/* <Dash /> */}
      {/* <ErrorBoundary> */}
      <Router>
        <Routes>
          <Route exact path='/' element={<Start />} />
          {/* <Route path='/index' element={<MainOld />} /> */}
          <Route path='/index' element={<Main />} />
          <Route path='/community' element={<Community />} />
          <Route path='/dashboard' element={<Dash />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </Router>
      {/* </ErrorBoundary> */}
    </div>
  )
}

export default App
