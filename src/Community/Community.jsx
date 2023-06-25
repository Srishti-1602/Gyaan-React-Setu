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
            <JsonNode data={communityData} setData={handleSetData} />
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default Community
