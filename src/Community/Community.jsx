import React from 'react'
import './community.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar1 from '../NewNav/NewNav'
import JsonNode from '../Main/JSONnode/JsonNode'
import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import FilterBy from './CommunityComponents/FilterBy'
import NoteData from './CommunityComponents/NoteData'

const jsonData = {}

function Community () {
  /* Handling Fetch Community data from Firebase and Giving JSON output for rendering */
  const [communityData, setCommunityData] = useState(jsonData)

  useEffect(() => {
    const database = getDatabase()
    const communityRef = ref(database, 'community')

    onValue(communityRef, snapshot => {
      const data = snapshot.val()
      console.log(data)
      setCommunityData(data)
      console.log(communityData)
    })
  }, [])
  /* End of Handling Search and Giving JSON output for rendering */
  const handleSetData = newData => {
    setCommunityData(newData)
    console.log(newData)
  }

  return (
    <div>
      <Navbar1 />
      <div className='row row-cols-1 row-cols-md-3 mb-2 text-center'>
        <div className='col-filter col-md-3'>
          <FilterBy />
        </div>
        <div className='col-search col-md-8'>
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
          <NoteData />
          <div className='card-note mb-4 rounded-3 shadow-sm'>
            <div className='card-body-note'>
              <h1 className='card-title-clg pricing-card-title'></h1>
              <div id='Community-data' className='CommunityData'></div>
            </div>
            <JsonNode data={communityData} setData={handleSetData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
