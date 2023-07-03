import React from 'react'
import { useState } from 'react'
import '../community.css'
import RemixCom from './Remix2'
import Stars from './Stars'

const NotesData = () => {
  return (
    <div className='cardUpper'>
      <div className='card-data mb-4 rounded-3 shadow-sm'>
        <div className='card-body-data'>
          {/* <h1 className='card-title-clg1 pricing-card-title'></h1> */}
          <div className='CommunityData'>
            <div id='Community-data' className='CommunityDataNote'>
              <div className='data-row'>
                {/* <h5>Note Title:</h5> */}
                <span className='Title'>Note Title Answer</span>
              </div>
            </div>
            <span>/</span>
            <div id='Community-data' className='CommunityDataSub'>
              <div className='data-row'>
                {/* <h5>Subject:</h5> */}
                <span className='subj'>Subject Answer </span>
              </div>
            </div>
          </div>
          <div id='Community-icon' className='CommunityIcon'>
            <div className='CommunityCreator'>
              <div className='data-row'>
                <span className='By'>By:</span>
                <span className='NameBy'>Creator Name</span>
              </div>
            </div>
            <div className='CommunityCreated'>
              <div className='data-row'>
                <span className='On'>Date:</span>
                <span className='DateOn'>Created on</span>
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
                  <RemixCom />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card-data mb-4 rounded-3 shadow-sm'>
        <div className='card-body-data'>
          {/* <h1 className='card-title-clg1 pricing-card-title'></h1> */}
          <div className='CommunityData'>
            <div id='Community-data' className='CommunityDataNote'>
              <div className='data-row'>
                {/* <h5>Note Title:</h5> */}
                <span className='Title'>Note Title Answer</span>
              </div>
            </div>
            <span>/</span>
            <div id='Community-data' className='CommunityDataSub'>
              <div className='data-row'>
                {/* <h5>Subject:</h5> */}
                <span className='subj'>Subject Answer </span>
              </div>
            </div>
          </div>
          <div id='Community-icon' className='CommunityIcon'>
            <div className='CommunityCreator'>
              <div className='data-row'>
                <span className='By'>By:</span>
                <span className='NameBy'>Creator Name</span>
              </div>
            </div>
            <div className='CommunityCreated'>
              <div className='data-row'>
                <span className='On'>Date:</span>
                <span className='DateOn'>Created on</span>
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
                  <RemixCom />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesData
