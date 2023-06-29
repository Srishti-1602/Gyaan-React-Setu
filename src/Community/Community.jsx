import React from 'react'
// import Navbar from "../Nav/Nav";
import './community.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar1 from '../NewNav/NewNav';
import JsonNode from '../Main/JSONnode/JsonNode';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const jsonData = {}

function Community() {
  /* Handling Fetch Community data from Firebase and Giving JSON output for rendering */
  const [communityData, setCommunityData] = useState(jsonData);

  useEffect(() => {
    const database = getDatabase();
    const communityRef = ref(database, 'community');

    onValue(communityRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setCommunityData(data);
      console.log(communityData);
    });
  }, []);
  /* End of Handling Search and Giving JSON output for rendering */
  const handleSetData = (newData) => {
    setCommunityData(newData);
    console.log(newData);
  };
  return (
    <div>
      <Navbar1 />
      {/* <Navbar1 /> */}
      <div className='row row-cols-1 row-cols-md-3 mb-2 text-center'>
        <div className='col-filter col-md-3'>
          <div className='card-filter mb-4 rounded-3 shadow-sm'>
            <div className='card-body-clg'>
              <h1 className='card-title-clg pricing-card-title'>Filter by</h1>
              <div id='Community-data' className='CommunityData'>
                <div className='checkpoints'>
                  <div className='checkpoint'>
                    <input type='checkbox' id='degree' name='degree' />
                    <label htmlFor='degree'>Degree</label>
                  </div>
                  <div className='checkpoint'>
                    <input type='checkbox' id='school' name='school' />
                    <label htmlFor='school'>School</label>
                  </div>
                  <div className='checkpoint'>
                    <input type='checkbox' id='year' name='year' />
                    <label htmlFor='year'>Year</label>
                  </div>
                  <div className='checkpoint'>
                    <input type='checkbox' id='note-title' name='note-title' />
                    <label htmlFor='note-title'>Note Title</label>
                  </div>
                  <div className='checkpoint'>
                    <input type='checkbox' id='subject' name='subject' />
                    <label htmlFor='subject'>Subject</label>
                  </div>
                  <div className='checkpoint'>
                    <input type='checkbox' id='branch' name='subject' />
                    <label htmlFor='subject'>Branch</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-clg col-md-8'>
          <div className='card-clg mb-4 rounded-3 shadow-sm'>
            <div className='card-body-clg'>
              <h1 className='card-title-clg pricing-card-title'>Filter by</h1>
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
            <JsonNode data={communityData} setData={handleSetData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
