import React from 'react'
// import Navbar from "../Nav/Nav";
import './community.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar1 from '../NewNav/NewNav'

function Community () {
  return (
    <div>
      <Navbar1 />
      {/* <Navbar1 /> */}

      {/* <div className='row row-cols-1 row-cols-md-1 mb-1 text-center'> */}
      <div className='col-clg col-md-8'>
        <div className='card-clg mb-4 rounded-3 shadow-sm'>
          <div className='card-body-clg'>
            <h1 className='card-title-clg pricing-card-title'>
              Connect with the community
            </h1>
            <div id='Community-data' className='CommunityData'>
              <div className='user-search'>
                <form id='search-user'>
                  <input
                    type='search'
                    className='searchbar-user'
                    placeholder=' Search topics from users...'
                    name='search'
                    id='search-input'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default Community
