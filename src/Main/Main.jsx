import React, { useState, useEffect } from 'react'
import './main.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Navbar1 from '../NewNav/NewNav'
/* import JsonNode from './JSONnode/JsonNodeOld'; */
import JsonNode from './JSONnode/JsonNode'
import Search from './Search/Search'
import SaveButton from './MainComponents/SaveButton'
import CommentSection from './MainComponents/CommentSection'
import FeedbackComponent from './MainComponents/FeedbackSection'
import Remix from './MainComponents/Remix'
import LoadingBar from './Search/loadingAnimation/loadingAnimation'
import { getQueryId } from './Search/queryIdManager'
import { useLocation } from 'react-router-dom'
import data from './data'
// import Option from '../icons/option.png'
import View from '../Community/CommunityComponents/View.jsx'

//const data = {};

export default function Main (props) {
  /* Getting User ID */
  const [userId, setUserId] = useState(null) // Store the userId here
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Store the isLoggedIn state here

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        setUserId(user.uid) // Set the userId if the user is logged in
      } else {
        setIsLoggedIn(false)
        setUserId(null) // Reset the userId if the user is not logged in
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])
  /* End of Getting User ID */

  /* Handling Search and Giving JSON output for rendering */
  const [jsonData, setJsonData] = useState(data)

  const handleSetData = newData => {
    setJsonData(newData)
    console.log(newData)
  }

  const handleSearch = searchQuery => {
    console.log('Search query:', searchQuery)
    setJsonData(searchQuery)
  }
  console.log(jsonData)
  /* End of Handling Search and Giving JSON output for rendering */

  /* Query Processing status */
  const [queryStatus, setQueryStatus] = useState('static') // Add query status state
  const queryId = getQueryId() // Get the queryId from the queryIdManager
  const queryRef = `users/${userId}/Queries/${queryId}`

  useEffect(() => {
    const database = getDatabase()
    const queryStatusRef = ref(
      database,
      `users/${userId}/Queries/currentQueryStatus`
    )
    onValue(queryStatusRef, snapshot => {
      const status = snapshot.val() || 'static'
      console.log(status)
      setQueryStatus(status)
    })
  }, [userId])
  /* End of Query Processing status */

  /* Fetch Saved Note Id */
  const location = useLocation()
  const [savedNoteId, setSavedNoteId] = useState(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const queryIdParam = searchParams.get('queryId')

    if (queryIdParam) {
      const database = getDatabase()
      const savedNoteIdRef = ref(
        database,
        `users/${userId}/Queries/${queryIdParam}/Saved`
      ) // Replace QUERY_ID and CURRENT_QUERY_ID with actual values

      onValue(savedNoteIdRef, snapshot => {
        const savedNote = snapshot.val() || null
        console.log(savedNote)
        setSavedNoteId(savedNote)
        fetchData(savedNote) // Call fetchData with the updated savedNoteId
      })
    }
  }, [userId])

  /* Fetch data from Firestore based on queryId */
  const fetchData = async savedNoteId => {
    const searchParams = new URLSearchParams(location.search)
    const queryIdParam = searchParams.get('queryId')

    if (queryIdParam && savedNoteId) {
      const firestore = getFirestore()
      console.log(savedNoteId)
      const docRef = doc(firestore, 'notes', savedNoteId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const noteData = docSnap.data().jsonData // Retrieve data from the 'jsonData' node
        const parsedData = JSON.parse(noteData) // Parse the data using JSON.parse()
        setJsonData(parsedData)
      } else {
        console.log('Note does not exist')
      }
    }
  }

  useEffect(() => {
    fetchData(savedNoteId) // Call fetchData initially with the savedNoteId
  }, [location.search, savedNoteId])
  /* End of Fetch data from Firestore based on queryId */

  /* Add nodes functionality */
  const handleUpdateData = updatedData => {
    setJsonData(updatedData)
  }

  const [selectedOption, setSelectedOption] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleOptionClick = option => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  return (
    <div className='MainContent'>
      <Navbar1 />

      <div className='your-topics'>
        <Search onSearch={handleSearch} />
      </div>

      <div className='rectnotes'>
        <div className='note-info'></div>

        <div className='icon'>
          <SaveButton
            jsonData={jsonData}
            queryRef={queryRef}
            isLoggedIn={isLoggedIn}
            UserID={userId}
          />

          <div className='custom-dropdown'>
            <div
              className='dropdown-header'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Select an option
              <span className='dropdown-arrow'>&#9662;</span>
            </div>
            {isDropdownOpen && (
              <div className='dropdown-options'>
                <div
                  className='option'
                  onClick={() => handleOptionClick('remix')}
                >
                  <Remix />
                </div>
                <div
                  className='option'
                  onClick={() => handleOptionClick('comment')}
                >
                  <div onClick={e => e.stopPropagation()}>
                    <CommentSection />
                  </div>
                  {/* Comment */}
                </div>
                <div
                  className='option'
                  onClick={() => handleOptionClick('feedback')}
                >
                  <div onClick={e => e.stopPropagation()}>
                    <FeedbackComponent />
                  </div>
                  {/* Feedback */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className='icon'>
          <SaveButton
            jsonData={jsonData}
            queryRef={queryRef}
            isLoggedIn={isLoggedIn}
            UserID={userId}
          />
          <Remix />
          <CommentSection />
          <FeedbackComponent />
        </div> */}
        <div id='tree-view'>
          {queryStatus === 'processing' ? <LoadingBar /> : null}
          <JsonNode data={jsonData} setData={handleSetData} />
        </div>
      </div>
    </div>
  )
}
