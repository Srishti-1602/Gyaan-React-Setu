import React, { useState, useRef } from 'react'
import FeedbackIcon from '../../icons/feedback-fill.png'
import '../main.css'

const FeedbackSection = ({ isVisible, onClose }) => {
  const [feedbackText, setFeedbackText] = useState('')

  const handleFeedbackChange = event => {
    setFeedbackText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Handle submission of feedback
    console.log('Feedback submitted:', feedbackText)
    setFeedbackText('')
  }

  return (
    <div className={`feedback-section ${isVisible ? 'visible' : ''}`}>
      <button className='close-button-feed' onClick={onClose}>
        x
      </button>
      <h3 className='feedbachHead'>Feedback Section</h3>
      <form onSubmit={handleSubmit} className='feedFrom'>
        <div className='input-group'>
          <input type='text' placeholder='Name' />
          <input type='email' placeholder='Email' />
        </div>
        <textarea
          value={feedbackText}
          onChange={handleFeedbackChange}
          placeholder='Enter your feedback'
          className='feedText'
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

const FeedbackButton = ({ onClick }) => {
  return (
    <button className='feedback-button-but' onClick={onClick}>
      <img src={FeedbackIcon} alt='Feedback' className='feedback-button' />
      Feedback
    </button>
  )
}

const FeedbackComponent = () => {
  const rectNotesRef = useRef(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const toggleFeedback = () => {
    setShowFeedback(prevShowFeedback => !prevShowFeedback)
  }

  return (
    <div>
      <FeedbackButton onClick={toggleFeedback} />
      {showFeedback && (
        <FeedbackSection isVisible={true} onClose={toggleFeedback} />
      )}
    </div>
  )
}

export default FeedbackComponent
