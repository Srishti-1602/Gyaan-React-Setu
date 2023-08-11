import React, { useRef } from 'react'
import RemixIcon from '../../icons/eye-line.png'
import '../community.css'

const View = () => {
  const rectNotesRef = useRef(null)

  return (
    <a href=' '>
      <img src={RemixIcon} alt='View' className='ViewComm' id='ViewCommunity' />
    </a>
  )
}

export default View
