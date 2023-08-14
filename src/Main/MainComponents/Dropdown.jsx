import '../main.css'
import React, { useState } from 'react'
import FeedbackComponent from './FeedbackSection'
import CommentSection from './CommentSection'
import Remix from './Remix'

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const handleOptionClick = option => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }
  return (
    <div className='dropdown-container'>
      <div className='custom-dropdown'>
        <div
          className='dropdown-header'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Select
          <span className='dropdown-arrow'>&#9662;</span>
        </div>
        {isDropdownOpen && (
          <div className='dropdown-options'>
            <div className='option' onClick={() => handleOptionClick('remix')}>
              <Remix />
            </div>
            <div
              className='option'
              onClick={() => handleOptionClick('comment')}
            >
              <div onClick={e => e.stopPropagation()}>
                <CommentSection />
              </div>
            </div>
            <div
              className='option'
              onClick={() => handleOptionClick('feedback')}
            >
              <div onClick={e => e.stopPropagation()}>
                <FeedbackComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
