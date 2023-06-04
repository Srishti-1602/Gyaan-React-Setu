import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React, { useState, useRef } from 'react'
import './main.css'
import JsonNode from './JSONnode/JsonNode'
import Search from './Search/Search'
import CommentIcon from '../icons/discuss-line.png'
import RemixIcon from '../icons/share-forward-box-line.png'
import FeedbackIcon from '../icons/feedback-fill.png'
import Upward from '../icons/icons8-send-letter-50.png'
import { useNavigate } from 'react-router-dom'
import Navbar1 from '../NewNav/NewNav'
import isLoading from './Search/Search'

const data = {
  id: 'A function of a real variable f(x) is differentiable at a point a of its domain, if its domain contains an open interval I containing a, and the limit","exists. This means that, for every positive real number \\(\\varepsilon \\) (even very small), there exists a positive real number \\\\(\\\\delta \\\\) such that, for every h such that \\\\(\\|h|<\\delta \\\\) and h≠0{\\displaystyle h\\neq 0} then $f(a+h)$ is defined, and',
  name: 'John Doe',
  paragraphs: 'dsadas',
  age: 30,
  hobbies: { paragraphs: ['dsadas'], basketball: 'football', music: 'movies' },
  address: {
    street: {
      paragraphs: [
        'afasfsa',
        'IMAGE_URL: https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        'dsafafa'
      ],
      '123 Main St': 'Apt 1'
    },
    city: 'Anytown',
    state: 'CA',
    url: [
      'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL'
    ],
    paragraphs: [
      'afasfsa',
      'dsafafa',
      'IMAGE_URL: https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
      'new element',
      'dasfsafsa',
      'ds',
      'dsafsa',
      'fsafsa'
    ]
  }
}

export default function Main (props) {
  const [jsonData, setJsonData] = useState(data)
  const [showSaveNote, setShowSaveNote] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const navigate = useNavigate()
  const isLoggedIn = props.isLoggedIn
  const rectNotesRef = useRef(null)
  const [showCommentSection, setShowCommentSection] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSetData = newData => {
    setJsonData(newData)
  }

  const handleSearch = searchQuery => {
    console.log(`Search query: ${searchQuery}`)
    setJsonData(searchQuery)
  }

  const handleSaveButtonClick = () => {
    if (isLoggedIn) {
      setShowSaveNote(true)
    } else {
      // Redirect to login page
      navigate('/login')
    }
  }

  const handleCommentSubmit = e => {
    e.preventDefault()
    if (commentText.trim() === '') return
    setComments([...comments, commentText])
    setCommentText('')
  }

  const handleScrollToTop = e => {
    e.preventDefault()
    const remixElement = rectNotesRef.current
    const rect = remixElement.getBoundingClientRect()
    const distanceToTop = rect.top
    const rectnotesDiv = document.querySelector('.rectnotes')
    rectnotesDiv.scrollBy({
      top: distanceToTop,
      behavior: 'smooth'
    })
  }

  const toggleCommentSection = e => {
    e.preventDefault()
    setShowCommentSection(prevState => !prevState)
  }

  function handleSaveSubmit (event) {
    event.preventDefault()
    // Form submission logic
  }

  const toggleFeedback = () => {
    setShowFeedback(prevShowFeedback => !prevShowFeedback)
  }

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
        <button className='close-button-feed' onClick={toggleFeedback}>
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
      <button className='feedback-button' onClick={onClick}>
        <img src={FeedbackIcon} alt='Feedback' className='feedback-button' />
      </button>
    )
  }

  return (
    <div className='MainContent'>
      <Navbar1 />

      {/* Comment Section Start */}
      <div
        id='comment-section'
        className='comment-section'
        style={{ display: showCommentSection ? 'block' : 'none' }}
      >
        <div id='comment-list'>
          {/* Close button for the comment section */}
          <span
            className='close'
            id='close-save-form-button'
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => setShowCommentSection(false)}
          >
            &times;
          </span>
          {/* Display existing comments */}
          {comments.map((comment, index) => (
            <div className='comment' key={index}>
              {comment}
            </div>
          ))}
        </div>
        {/* Form for adding new comments */}
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
      {/* Comment Section End */}

      {/* Search Your Topic */}
      <div className='your-topics'>
        {/* Search component */}
        <Search onSearch={handleSearch} />
      </div>

      {/* Save Popup */}
      <div
        className='card bg-dark text-white save-note'
        id='save-in-rect'
        style={{ display: showSaveNote ? 'block' : 'none' }}
      >
        <span
          className='close'
          id='close-save-form-button'
          onClick={() => setShowSaveNote(false)}
        >
          &times;
        </span>

        <div className='card-body p-5 text-center card-save'>
          <div className='mb-md-5 mt-md-4 pb-5'>
            <h2 className='fw-bold mb-2 text-uppercase save-head'>Save Note</h2>
            <div className='save-inforec'>
              <div className='save-info'>
                {/* Form for saving notes */}
                <form id='savenote-form' onSubmit={handleSaveSubmit}>
                  <input
                    type='text'
                    className='save-title'
                    id='save-title'
                    placeholder='Note Title'
                    required
                  />
                  <input
                    type='text'
                    className='save-title'
                    id='save-subject'
                    placeholder='Subject'
                    required
                  />
                  <button type='submit' className='sign-up' id='save-button'>
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Save Popup End */}

      {/*Notes Area */}
      <div className='rectnotes'>
        <div className='icon'>
          <button
            type='button'
            className='savebutt'
            id='save-prompt-button'
            onClick={handleSaveButtonClick}
          >
            Save
          </button>
          <a href=' '>
            <img
              src={RemixIcon}
              alt='Remix'
              className='remixic'
              id='scrollid'
              ref={rectNotesRef}
            />
          </a>
          <a href=' ' onClick={toggleCommentSection}>
            <img src={CommentIcon} alt='Comment' className='commic' />
          </a>
          {/* Feedback button component */}
          <FeedbackButton onClick={toggleFeedback} />
        </div>
        {/* Display the Feedback Section if showFeedback is true */}
        {showFeedback && <FeedbackSection isVisible={true} />}
        <div className='notes'>
          <a href=' ' onClick={handleScrollToTop}>
            <img src={Upward} alt='Go Up' className='upward' />
          </a>
        </div>
        <div id='Summary-Preview'></div>
        <div id='tree-view'>
          {isLoading ? (
            <p style={{ color: 'white' }}>Loading...</p>
          ) : (
            <p>Hello</p>
          )}
          {/* Component for rendering JSON data */}
          <JsonNode data={jsonData} setData={handleSetData} />
        </div>
      </div>
    </div>
  )
}
