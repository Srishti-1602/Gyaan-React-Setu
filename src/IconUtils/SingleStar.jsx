import React, { useRef } from 'react'
import StarsIcon from '../icons/star-shape.png'

const SingleStar = ({}) => {
  //   const rectNotesRef = useRef(null)

  return (
    <a>
      <img src={StarsIcon} alt='StarsIcon' className='Unlike' id='StarsIcon' />
      {'  '}
      {2}
    </a>
  )
}

export default SingleStar
