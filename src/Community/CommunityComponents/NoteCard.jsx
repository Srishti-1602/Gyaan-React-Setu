import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import View from './View';
import RemixCom from './Remix2';
import Stars from './Stars';
import { getDatabase, ref, get } from 'firebase/database'; // Import the necessary Firebase functions

const NoteCard = ({ key, noteId, noteTitle, noteSubject, noteCreator, noteLastEdited, noteContent, starsNum, remixNum, viewsNum }) => {
  const [creatorUsername, setCreatorUsername] = useState(''); // State to hold the creator's username

  console.log(noteId);

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, `users/${noteCreator}`);

    // Fetch the username from the users node based on noteCreator
    get(usersRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log('userData:', userData);
          setCreatorUsername(userData.username || 'Unknown User');
        } else {
          setCreatorUsername('Unknown User');
        }
      })
      .catch(error => {
        console.error('Error fetching username:', error);
        setCreatorUsername('Unknown User');
      });
  }, [noteCreator]);


  return (
    <div className='card-data mb-4 rounded-3 shadow-sm'>
      <Link to={`/index?NId=${noteId}`}>
        <div className='card-body-data'>
          {/* <h1 className='card-title-clg1 pricing-card-title'></h1> */}
          <div className='CommunityData'>
            <div id='Community-data' className='CommunityDataNote'>
              <div className='data-row'>
                {/* <h5>Note Title:</h5> */}
                <span className='Title'>{noteTitle}</span>
              </div>
            </div>
            <span>/</span>
            <div id='Community-data' className='CommunityDataSub'>
              <div className='data-row'>
                {/* <h5>Subject:</h5> */}
                <span className='subj'>{noteSubject} </span>
              </div>
            </div>
          </div>
          <div id='Community-icon' className='CommunityIcon'>
            <div className='CommunityCreator'>
              <div className='data-row'>
                <span className='By'>By:</span>
                <span className='NameBy'>{creatorUsername}</span>
              </div>
            </div>
            <div className='CommunityCreated'>
              <div className='data-row'>
                <span className='On'>Last Edited:</span>
                <span className='DateOn'>{noteLastEdited}</span>
              </div>
            </div>
            <div className='CommunityDownloadIcon'>
              <div className='CommunityStar'>
                <div className='icon-row'>
                  {starsNum} <Stars />
                </div>
              </div>
              <div className='CommunityRemix'>
                <div className='icon-row'>
                  {remixNum} <RemixCom />
                </div>
              </div>
              <div className='CommunityView'>
                <div className='icon-row'>
                  {viewsNum} <View />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NoteCard
