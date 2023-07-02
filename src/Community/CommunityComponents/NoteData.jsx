import React from 'react'
import { useState } from 'react'
import '../community.css'
import Remix from '../../Main/MainComponents/Remix'
import Stars from './Stars'

const NotesData = () => {
  return (
    <div className='card-data mb-4 rounded-3 shadow-sm'>
      <div className='card-body-data'>
        {/* <h1 className='card-title-clg1 pricing-card-title'></h1> */}
        <div className='CommunityData'>
          <div id='Community-data' className='CommunityDataNote'>
            <div className='data-row'>
              <h5>Note Title:</h5>
              <span>Note Title Answer</span>
            </div>
          </div>
          <div id='Community-data' className='CommunityDataSub'>
            <div className='data-row'>
              <h5>Subject:</h5>
              <span>Subject Answer</span>
            </div>
          </div>
        </div>
        <div id='Community-icon' className='CommunityIcon'>
          <div className='CommunityCreator'>
            <div className='data-row'>
              <h5>Created By:</h5>
              <span>Creator Name</span>
            </div>
          </div>
          <div className='CommunityCreated'>
            <div className='data-row'>
              <h5>Created On:</h5>
              <span>Creator Name</span>
            </div>
          </div>
          <div className='CommunityDownloadIcon'>
            <div className='CommunityStar'>
              <div className='icon-row'>
                <Stars />
              </div>
            </div>
            <div className='CommunityRemix'>
              <div className='icon-row'>
                <Remix />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesData
