import React, { useState } from 'react'
import StarUnIcon from '../../icons/star-shape.png'
import StarIcon from '../../icons/star.png'
import '../community.css'

function Stars () {
  const [liked, setLiked] = useState(false)

  const handleLikeClick = event => {
    event.preventDefault()
    setLiked(!liked)
  }

  return (
    <a href=' ' onClick={handleLikeClick}>
      {liked ? (
        <img src={StarUnIcon} alt='Unlike' className='Unlike' id='unlike' />
      ) : (
        <img src={StarIcon} alt='Like' className='Like' id='like' />
      )}
    </a>
  )
}

export default Stars
