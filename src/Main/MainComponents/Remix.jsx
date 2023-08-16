import React, { useRef } from 'react'
import RemixIcon from '../../icons/share-forward-box-line.png'
import '../main.css'

const Remix = () => {
  const rectNotesRef = useRef(null)

  const handleRemixClick = e => {
    e.preventDefault()
    // Handle Remix click event
    // Add your logic here
  }

  return (
    <a href=' ' onClick={handleRemixClick}>
      <img
        src={RemixIcon}
        alt='Remix'
        className='remixic'
        id='scrollid'
        ref={rectNotesRef}
      />
      {/* <span className='remix-text'>Remix</span> */}
    </a>
  )
}

export default Remix
