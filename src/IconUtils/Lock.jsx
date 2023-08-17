import React, { useRef } from 'react'
import LockIcon from '../icons/lock-line.png'

const Lock = ({ remixNum }) => {
  const rectNotesRef = useRef(null)

  return (
    <a>
      <img src={LockIcon} alt='Lock' className='Lock' id='Lock' />
    </a>
  )
}

export default Lock
