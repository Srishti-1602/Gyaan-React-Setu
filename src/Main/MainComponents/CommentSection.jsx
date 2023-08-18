import React, { useState, useEffect } from 'react'
import CommentIcon from '../../icons/discuss-line.png'
import { getDatabase, ref, push, set, onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom' // Import the navigate hook

const CommentSection = ({ noteId, UserID }) => {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [showCommentSection, setShowCommentSection] = useState(false)

  const navigate = useNavigate() // Initialize the navigate hook

  /* Get User Data */
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const database = getDatabase()
    const userRef = ref(database, `users/${UserID}`) // Make sure UserID is defined somewhere

    onValue(userRef, snapshot => {
      const userDataValue = snapshot.val()
      setUserData(userDataValue)
    })
  }, [UserID])

  const handleCommentSubmit = async e => {
    e.preventDefault()
    if (commentText.trim() === '') return

    const database = getDatabase()
    const uniqueCommentID = push(ref(database, `notes/${noteId}/Comments`)).key

    await set(
      ref(database, `notes/${noteId}/Comments/${uniqueCommentID}/comment`),
      commentText
    )
    await set(
      ref(database, `notes/${noteId}/Comments/${uniqueCommentID}/commented_by`),
      userData ? userData.username : ''
    )

    setComments([...comments, commentText])
    setCommentText('')
  }

  const toggleCommentSection = e => {
    e.preventDefault()
    setShowCommentSection(prevState => !prevState)
  }

  return (
    <div>
      <div
        id='comment-section'
        className='comment-section'
        style={{ display: showCommentSection ? 'block' : 'none' }}
      >
        <div id='comment-list'>
          <span
            className='close'
            id='close-save-form-button'
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => setShowCommentSection(false)}
          >
            &times;
          </span>
          {comments.map((comment, index) => (
            <div className='comment' key={index}>
              {comment}
            </div>
          ))}
        </div>
        <form id='comment-form' onSubmit={handleCommentSubmit}>
          <div className='comment-input-container'>
            <textarea
              id='comment-textarea'
              placeholder='Add a comment'
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            ></textarea>
            <button type='submit'>Post</button>
          </div>
        </form>
      </div>
      <a href=' ' onClick={toggleCommentSection}>
        <img src={CommentIcon} alt='Comment' className='commic' />
      </a>
    </div>
  )
}

export default CommentSection
