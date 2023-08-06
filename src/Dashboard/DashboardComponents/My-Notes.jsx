import React, { useEffect, useState } from 'react'
import RemixCom from '../../Community/CommunityComponents/Remix2'
import Stars from '../../Community/CommunityComponents/Stars'
// import Views from '../../icons/spy-fill.png'

const MyNotes = () => {
  return (
    <div className='row row-notes-display'>
      <div className='col-display col-lg-3 col-md-5 col-sm-5 note-rec'>
        <div className='note-rec-head'>
          <h3 className='card-title-note'>Rectangle</h3>
        </div>
        <div className='note-rec-body'>
          <p>Subject: </p>
          <p>Created On: </p>
          {/* <p>Comments: </p> */}
        </div>
        <div className='icon-my-notes'>
          <ul>
            <li>
              <RemixCom />
              <span className='IconDash'>Remix</span>
            </li>
            <li>
              <Stars />
              <span className='IconDash'>Stars</span>
            </li>
            <li>
              {/* <Views /> */}
              <Stars />
              <span className='IconDash'>Views</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='col-display col-lg-3 col-md-5 col-sm-5 note-rec'>
        <div className='note-rec-head'>
          <h3 className='card-title-note'>Rectangle</h3>
        </div>
        <div className='note-rec-body'>
          <p>Subject: </p>
          <p>Created On: </p>
          {/* <p>Comments: </p> */}
        </div>
        <div className='icon-my-notes'>
          <ul>
            <li>
              <RemixCom />
              <span className='IconDash'>Remix</span>
            </li>
            <li>
              <Stars />
              <span className='IconDash'>Stars</span>
            </li>
            <li>
              {/* <Views /> */}
              <Stars />
              <span className='IconDash'>Views</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='col-display col-lg-3 col-md-5 col-sm-5 note-rec'>
        <div className='note-rec-head'>
          <h3 className='card-title-note'>Rectangle</h3>
        </div>
        <div className='note-rec-body'>
          <p>Subject: </p>
          <p>Created On: </p>
          {/* <p>Comments: </p> */}
        </div>
        <div className='icon-my-notes'>
          <ul>
            <li>
              <RemixCom />
              <span className='IconDash'>Remix</span>
            </li>
            <li>
              <Stars />
              <span className='IconDash'>Stars</span>
            </li>
            <li>
              {/* <Views /> */}
              <Stars />
              <span className='IconDash'>Views</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='col-display col-lg-3 col-md-5 col-sm-5 note-rec'>
        <div className='note-rec-head'>
          <h3 className='card-title-note'>Rectangle</h3>
        </div>
        <div className='note-rec-body'>
          <p>Subject: </p>
          <p>Created On: </p>
          {/* <p>Comments: </p> */}
        </div>
        <div className='icon-my-notes'>
          <ul>
            <li>
              <RemixCom />
              <span className='IconDash'>Remix</span>
            </li>
            <li>
              <Stars />
              <span className='IconDash'>Stars</span>
            </li>
            <li>
              {/* <Views /> */}
              <Stars />
              <span className='IconDash'>Views</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='col-display col-lg-3 col-md-5 col-sm-5 note-rec'>
        <div className='note-rec-head'>
          <h3 className='card-title-note'>Rectangle</h3>
        </div>
        <div className='note-rec-body'>
          <p>Subject: </p>
          <p>Created On: </p>
          {/* <p>Comments: </p> */}
        </div>
        <div className='icon-my-notes'>
          <ul>
            <li>
              <RemixCom />
              <span className='IconDash'>Remix</span>
            </li>
            <li>
              <Stars />
              <span className='IconDash'>Stars</span>
            </li>
            <li>
              {/* <Views /> */}
              <Stars />
              <span className='IconDash'>Views</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyNotes
