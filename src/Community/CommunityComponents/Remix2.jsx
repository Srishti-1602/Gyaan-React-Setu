import React, { useRef } from 'react'
import RemixIcon from '../../icons/share-forward-box-line.png'
import '../community.css'

const RemixCom = () => {
  const rectNotesRef = useRef(null)

  return (
    <a href=' '>
      <img
        src={RemixIcon}
        alt='Remix'
        className='RemixComm'
        id='RemicCommunity'
      />
    </a>
  )
}

export default RemixCom
