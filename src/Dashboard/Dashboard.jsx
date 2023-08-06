import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Navbar1 from '../NewNav/NewNav'
import UserProfile from './DashboardComponents/UserProfile'
import TaskComponents from './DashboardComponents/TaskComponents'
import NotesDisplayDash from './DashboardComponents/NotesDisplayDash'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

function Dash () {
  const [userId, setUserId] = useState(null) // Store the userId here
  const [queryIds, setQueryIds] = useState([]) // Store the array of queryIds here

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid) // Set the userId if the user is logged in
        // Fetch the queryIds for the user
        const userQueriesRef = `users/${user.uid}/Queries`
        const database = getDatabase() // Get the database instance
        const queryIdsRef = ref(database, userQueriesRef)
        onValue(queryIdsRef, snapshot => {
          const queryIds = Object.keys(snapshot.val() || {}).filter(
            queryId => queryId !== 'currentQueryStatus' // Exclude 'currentQueryStatus'
          )
          setQueryIds(queryIds)
        })
      } else {
        setUserId(null) // Reset the userId if the user is not logged in
        setQueryIds([]) // Reset the queryIds
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <div>
        <Navbar1 />
        <div className='row row-cols-1 row-cols-md-4 mb-3 text-center dash-main'>
          <UserProfile userId={userId} />
          <NotesDisplayDash />
        </div>
      </div>
    </>
  )
}

export default Dash
