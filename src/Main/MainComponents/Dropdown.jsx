// import '../main.css'
// import React, { useState } from 'react'
// import FeedbackComponent from './FeedbackSection'
// import CommentSection from './CommentSection'
// import Remix from './Remix'

// const Dropdown = () => {
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const handleOptionClick = option => {
//     setSelectedOption(option)
//     setIsDropdownOpen(false)
//   }
//   return (
//     <div className='dropdown-container'>
//       <div className='custom-dropdown'>
//         <div
//           className='dropdown-header'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           Select
//           <span className='dropdown-arrow'>&#9662;</span>
//         </div>
//         {isDropdownOpen && (
//           <div className='dropdown-options'>
//             <div className='option' onClick={() => handleOptionClick('remix')}>
//               <Remix />
//             </div>
//             <div
//               className='option'
//               onClick={() => handleOptionClick('comment')}
//             >
//               <div onClick={e => e.stopPropagation()}>
//                 <CommentSection />
//               </div>
//             </div>
//             <div
//               className='option'
//               onClick={() => handleOptionClick('feedback')}
//             >
//               <div onClick={e => e.stopPropagation()}>
//                 <FeedbackComponent />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Dropdown

import React, { useState, useEffect } from 'react'
import FeedbackComponent from './FeedbackSection'
import CommentSection from './CommentSection'
import Remix from './Remix'

const Dropdown = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900)
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOptionClick = option => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  return (
    <div className='dropdown-container'>
      {isSmallScreen && (
        <div className={`custom-dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <div className='dropdown-header' onClick={handleDropdownClick}>
            More
            <span className='dropdown-arrow'>
              &#9662;
              {/* {' '}
              {isDropdownOpen ? '▲' : '▼'} */}
            </span>
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
              </div>
              <div
                className='option-feed'
                onClick={() => handleOptionClick('feedback')}
              >
                <div onClick={e => e.stopPropagation()}>
                  <FeedbackComponent />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!isSmallScreen && (
        <div className='icons-container'>
          <div className='icons' onClick={() => handleOptionClick('remix')}>
            <Remix />
          </div>
          <div className='icons' onClick={() => handleOptionClick('comment')}>
            <div onClick={e => e.stopPropagation()}>
              <CommentSection />
            </div>
          </div>
          <div className='icons' onClick={() => handleOptionClick('feedback')}>
            <div onClick={e => e.stopPropagation()}>
              <FeedbackComponent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
