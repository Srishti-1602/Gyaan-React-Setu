import '../main.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getDatabase, ref, onValue, get } from 'firebase/database'
import RemixCom from '../../Community/CommunityComponents/Remix2.jsx'
import View from '../../Community/CommunityComponents/View.jsx'
import Star from '../../Community/CommunityComponents/Star.jsx'

const PublicNoteData = ({ userId, noteId }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const hasNIdParam = queryParams.has('NId')
  const [createdBy, setCreatedBy] = useState(null)
  const [lastEditedDate, setLastEditedDate] = useState(null)
  const [starsNum, setStarsNum] = useState(0)
  const [remixNum, setRemixNum] = useState(0)
  const [viewsNum, setViewsNum] = useState(0)
  // const [isDropdown, setIsDropdown] = useState(false)

  useEffect(() => {
    if (!hasNIdParam) {
      return // Do nothing if NId parameter is not present
    }

    const database = getDatabase()
    const noteRef = ref(database, `notes/${noteId}`)

    onValue(noteRef, snapshot => {
      const noteData = snapshot.val()
      if (noteData) {
        setCreatedBy(noteData.created_by)
        setLastEditedDate(new Date(noteData.created_at).toLocaleDateString())
        setStarsNum(noteData.stars)
        setRemixNum(noteData.remix)
        setViewsNum(noteData.views)
      }
    })
    // setIsDropdown(window.innerWidth <= 900)
  }, [hasNIdParam, noteId])

  const [creatorUsername, setCreatorUsername] = useState('') // State to hold the creator's username

  useEffect(() => {
    const database = getDatabase()
    const usersRef = ref(database, `users/${createdBy}`)

    // Fetch the username from the users node based on noteCreator
    get(usersRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val()
          console.log('userData:', userData)
          setCreatorUsername(userData.username || 'Unknown User')
        } else {
          setCreatorUsername('Unknown User')
        }
      })
      .catch(error => {
        console.error('Error fetching username:', error)
        setCreatorUsername('Unknown User')
      })
  }, [createdBy])

  if (!hasNIdParam) {
    return null // Return null if NId parameter is not present
  }

  return (
    <div className='User-Main'>
      {/* {isDropdown ? (
        <select>
          <option>
            {createdBy === userId ? 'Your Note' : `Title: ${creatorUsername}`}
          </option>
          <option>
            {createdBy === userId
              ? 'Your Note'
              : `Created By: ${creatorUsername}`}
          </option>
          <option>{`Last edit: ${lastEditedDate}`}</option>
          <option>
            <Star />: {starsNum} <RemixCom />: {remixNum} <View />: {viewsNum}
          </option>
        </select>
      ) : (
        <> */}
      <span className='TitleUser'>
        {createdBy === userId ? 'Your Note' : `Title: ${creatorUsername}`}
      </span>
      <span className='MainUser'>
        {createdBy === userId ? 'Your Note' : `Created By: ${creatorUsername}`}
      </span>
      <span className='LastDateUser' style={{ color: 'white' }}>
        {`Last edit: ${lastEditedDate}`}
      </span>
      <span className='IconUser' style={{ color: 'white' }}>
        <Star />: {starsNum} <RemixCom />: {remixNum} <View />: {viewsNum}
      </span>
      {/* </>
      )} */}
    </div>
  )
}

export default PublicNoteData
