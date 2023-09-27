import React, { useState, useRef } from 'react'
import FeedbackIcon from '../../icons/feedback-fill.png'
import '../main.css'

const FeedbackSection = ({ isVisible, onClose }) => {
  const [feedbackText, setFeedbackText] = useState('')
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')

  const handleFeedbackChange = event => {
    setFeedbackText(event.target.value)
  }

  const handleNameChange = event => {
    setSenderName(event.target.value)
  }

  const handleEmailChange = event => {
    setSenderEmail(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Handle submission of feedback
    const emailContent = `
      Feedback from: ${senderName} <${senderEmail}>
      -------------------------------------------
      ${feedbackText}
    `

    // Replace with actual code to send the email
    sendFeedbackEmail(emailContent)

    setFeedbackText('')
    setSenderName('')
    setSenderEmail('')
    console.log('Feedback submitted:', feedbackText)
  }

  const sendFeedbackEmail = content => {
    const recipientEmail = 'srishtia1613@gmail.com' // Replace with the recipient's email
    console.log(
      `Simulating sending email to ${recipientEmail} with content:`,
      content
    )
  }

  return (
    <div className={`feedback-section ${isVisible ? 'visible' : ''}`}>
      <button className='close-button-feed' onClick={onClose}>
        x
      </button>
      <h3 className='feedbachHead'>Feedback Section</h3>
      <form onSubmit={handleSubmit} className='feedFrom'>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Name'
            value={senderName}
            onChange={handleNameChange}
          />
          <input
            type='email'
            placeholder='Email'
            value={senderEmail}
            onChange={handleEmailChange}
          />
        </div>
        <textarea
          value={feedbackText}
          onChange={handleFeedbackChange}
          placeholder='Enter your feedback'
          className='feedText'
        ></textarea>
        <button type='submit' className='feedback-submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

const FeedbackButton = ({ onClick }) => {
  return (
    <button className='feedback-button-but' onClick={onClick}>
      <img src={FeedbackIcon} alt='Feedback' className='feedback-button' />
      {/* Feedback */}
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
