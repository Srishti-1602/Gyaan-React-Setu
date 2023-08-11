import React, { useRef } from 'react'
// import StarUnIcon from '../../icons/star-shape.png'
import StarIcon from '../../icons/star.png'
import '../community.css'

const Star = () => {
  const rectNotesRef = useRef(null)

  return (
    <a href=' '>
      <img src={StarIcon} alt='Like' className='Like' id='like' />
    </a>
  )
}

export default Star
