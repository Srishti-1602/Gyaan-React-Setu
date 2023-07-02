import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import logo from '../Images/Gyaan setu.png'
import './newnav.css'
import { useNavigate } from 'react-router-dom'

function Navbar1 () {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        setUserId(user.uid)
      } else {
        setIsLoggedIn(false)
        setUserId(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (userId) {
      const database = getDatabase()
      const usernameRef = ref(database, `users/${userId}/username`)
      onValue(usernameRef, snapshot => {
        const usernameValue = snapshot.val() || ''
        setUsername(usernameValue)
        setProfilePicture(`https://robohash.org/${usernameValue}.png`)
      })
    }
  }, [userId])

  const handleProfileClick = () => {
    // Handle profile click logic, redirect to dashboard
    // You can use react-router-dom's useHistory hook for redirection
    // Example: history.push('/dashboard');
    navigate('/dashboard')
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='dark'
        className='backgroundNav'
        style={{ width: '100%', margin: '0' }}
      >
        <Container fluid className='container-style'>
          <div className='gyansetu'>
            <a className='navbar-brand' href='/'>
              <img
                className='Gyaanlogo'
                src={logo}
                alt=''
                style={{ width: '18%' }}
              />
            </a>

            <Navbar.Brand href='/index' className='headsetu'>
              GYAAN SETU
            </Navbar.Brand>
          </div>
          <Navbar.Toggle
            aria-controls='responsive-navbar-nav'
            className='toggle'
          />
          <Navbar.Collapse id='responsive-navbar-nav' className='responsiveNav'>
            <Nav className='ml-auto MalNav'>
              <Nav.Link href='/community' className='navwork'>
                Community
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  {/* Display profile picture */}
                  <div className='d-flex align-items-center profileDiv'>
                    <img
                      src={profilePicture}
                      alt='Profile'
                      className='profile-picture'
                      onClick={handleProfileClick}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* User not signed in, display sign in/sign up links */}
                  <Nav.Link href='/Login' className='navwork3'>
                    Sign In / Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar1
