import '../main.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue, get } from 'firebase/database';

const PublicNoteData = ({ userId, noteId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasNIdParam = queryParams.has('NId');
  const [createdBy, setCreatedBy] = useState(null);
  const [lastEditedDate, setLastEditedDate] = useState(null);
  const [starsNum, setStarsNum] = useState(0);
  const [remixNum, setRemixNum] = useState(0);
  const [viewsNum, setViewsNum] = useState(0);

  useEffect(() => {
    if (!hasNIdParam) {
      return; // Do nothing if NId parameter is not present
    }

    const database = getDatabase();
    const noteRef = ref(database, `notes/${noteId}`);
    
    onValue(noteRef, (snapshot) => {
      const noteData = snapshot.val();
      if (noteData) {
        setCreatedBy(noteData.created_by);
        setLastEditedDate(new Date(noteData.created_at).toLocaleDateString());
        setStarsNum(noteData.stars);
        setRemixNum(noteData.remix);
        setViewsNum(noteData.views);
      }
    });
  }, [hasNIdParam, noteId]);

  const [creatorUsername, setCreatorUsername] = useState('') // State to hold the creator's username

  useEffect(() => {
    const database = getDatabase()
    const usersRef = ref(database, `users/${createdBy}`)

    // Fetch the username from the users node based on noteCreator
    get(usersRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val()
          console.log('userData:', userData)
          setCreatorUsername(userData.username || 'Unknown User')
        } else {
          setCreatorUsername('Unknown User')
        }
      })
      .catch(error => {
        console.error('Error fetching username:', error)
        setCreatorUsername('Unknown User')
      })
  }, [createdBy])

  if (!hasNIdParam) {
    return null; // Return null if NId parameter is not present
  }

  return (
    <div className='User-Main'>
      <span className='MainUser'>{createdBy === userId ? 'Your Note' : `Created By: ${creatorUsername}`}</span>
      <span style={{ color: 'white' }}> {`Last edited date: ${lastEditedDate}  `}</span>
      <span style={{ color: 'white' }}>{`  Stars: ${starsNum} Remix: ${remixNum} Views: ${viewsNum}`}</span>
    </div>
  );
};

export default PublicNoteData;
