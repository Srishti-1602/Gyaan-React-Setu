// import React, { useRef, useState } from 'react'
// import StarIcon from '../icons/star.png'
// import UnstarIcon from '../icons/star-shape.png'

// const Star = ({ noteId }) => {
//   const [isStarred, setIsStarred] = useState(false)
//   const rectNotesRef = useRef(null)

//   const toggleStar = () => {
//     setIsStarred(!isStarred)
//   }

//   const iconSrc = isStarred ? UnstarIcon : StarIcon
//   const iconAlt = isStarred ? 'Unstar' : 'Star'

//   return (
//     <a onClick={toggleStar}>
//       <img
//         src={iconSrc}
//         alt={iconAlt}
//         className='Like'
//         id='like'
//         style={{ cursor: 'pointer' }}
//       />
//       {'  '}
//       {'2'}
//     </a>
//   )
// }

// export default Star

import React, { useRef, useState, useEffect } from 'react'
import { getDatabase, ref, update, onValue } from 'firebase/database'
import StarIcon from '../icons/star.png'
import UnstarIcon from '../icons/star-shape.png'

const Star = ({ userId, noteId }) => {
  const [isStarred, setIsStarred] = useState(false)
  const [starsNum, setStarsNum] = useState(0)
  const database = getDatabase()
  const noteStarsRef = ref(database, `notes/${noteId}/stars`)
  const isStarredRef = ref(database, `users/${userId}/StarredNotes`)

  // Check if the noteId is present in the user's StarredNotes
  useEffect(() => {
    onValue(isStarredRef, snapshot => {
      const starredNotes = snapshot.val()
      if (starredNotes && starredNotes[noteId]) {
        setIsStarred(true)
      }
    })
  }, [userId, noteId])

  useEffect(() => {
    onValue(noteStarsRef, snapshot => {
      const starsValue = snapshot.val()
      setStarsNum(starsValue)
    })
  }, [noteId])

  const toggleStar = () => {
    const updatedStarsNum = isStarred ? starsNum - 1 : starsNum + 1

    // Construct the update object
    const updateData = { [`notes/${noteId}/stars`]: updatedStarsNum }

    // Update the user's starred notes list if needed
    const starredNotesUpdate = isStarred
      ? { [`users/${userId}/StarredNotes/${noteId}`]: null }
      : { [`users/${userId}/StarredNotes/${noteId}`]: true }

    // Perform the update operations
    const updates = {
      ...updateData,
      ...starredNotesUpdate
    }

    update(ref(database), updates)
      .then(() => {
        setIsStarred(!isStarred)
        setStarsNum(updatedStarsNum)
      })
      .catch(error => {
        console.error('Error updating data:', error)
      })
  }

  const iconSrc = isStarred ? StarIcon : UnstarIcon
  const iconAlt = isStarred ? 'Unstar' : 'Star'

  return (
    <a onClick={toggleStar}>
      <img
        src={iconSrc}
        alt={iconAlt}
        className='Like'
        id='like'
        style={{ cursor: 'pointer' }}
      />
      {'  '}
      {starsNum}
    </a>
  )
}

export default Star
