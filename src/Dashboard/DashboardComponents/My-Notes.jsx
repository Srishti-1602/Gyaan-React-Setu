import React, { useEffect, useState } from 'react'
import RemixCom from '../../Community/CommunityComponents/Remix2'
import Stars from '../../Community/CommunityComponents/Stars'

const MyNotes = () => {
  return (
    <div className='row row-notes-display'>
      <div className='col-display col-lg-3 col-md-5 col-sm-5 note-rec'>
        <div className='note-rec-head'>
          <h3 className='card-title-note'>Rectangle</h3>
        </div>
        <div className='note-rec-body'>
          <p>Notes will be shown here</p>
        </div>
        <div className='icon-my-notes'>
          <ul>
            <li>
              <RemixCom /> Remix
            </li>
            <li>
              <Stars /> Stars
            </li>
            <li>
              <Stars /> Views
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyNotes
