// import "../main.css";
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { getDatabase, ref, onValue, get } from "firebase/database";
// import Remix from "../../IconUtils/Remix";
// import Views from "../../IconUtils/Views";
// import Star from "../../IconUtils/Star";

// const PublicNoteData = ({ userId, noteId }) => {
// 	const location = useLocation();
// 	const queryParams = new URLSearchParams(location.search);
// 	const hasNIdParam = queryParams.has("NId");
// 	const [createdBy, setCreatedBy] = useState(null);
// 	const [lastEditedDate, setLastEditedDate] = useState(null);
// 	const [remixNum, setRemixNum] = useState(0);
// 	const [viewsNum, setViewsNum] = useState(0);
// 	const [noteTitle, setNoteTitle] = useState(null);
// 	// const [isDropdown, setIsDropdown] = useState(false)

// 	useEffect(() => {
// 		if (!hasNIdParam) {
// 			return; // Do nothing if NId parameter is not present
// 		}

// 		const database = getDatabase();
// 		const noteRef = ref(database, `notes/${noteId}`);

// 		onValue(noteRef, (snapshot) => {
// 			const noteData = snapshot.val();
// 			if (noteData) {
// 				setCreatedBy(noteData.created_by);
// 				setLastEditedDate(new Date(noteData.created_at).toLocaleDateString());
// 				setRemixNum(noteData.remix);
// 				setViewsNum(noteData.views);
// 				setNoteTitle(noteData.title);
// 			}
// 		});
// 		// setIsDropdown(window.innerWidth <= 900)
// 	}, [hasNIdParam, noteId]);

// 	const [creatorUsername, setCreatorUsername] = useState(""); // State to hold the creator's username

// 	useEffect(() => {
// 		const database = getDatabase();
// 		const usersRef = ref(database, `users/${createdBy}`);

// 		// Fetch the username from the users node based on noteCreator
// 		get(usersRef)
// 			.then((snapshot) => {
// 				if (snapshot.exists()) {
// 					const userData = snapshot.val();
// 					console.log("userData:", userData);
// 					setCreatorUsername(userData.username || "Unknown User");
// 				} else {
// 					setCreatorUsername("Unknown User");
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error fetching username:", error);
// 				setCreatorUsername("Unknown User");
// 			});
// 	}, [createdBy]);

// 	if (!hasNIdParam) {
// 		return null; // Return null if NId parameter is not present
// 	}

// 	return (
// 		<div className="User-Main">
// 			<span className="TitleUser">{`Title: ${noteTitle}`}</span>
// 			<span className="MainUser">
// 				{createdBy === userId ? "Your Note" : `Created By: ${creatorUsername}`}
// 			</span>
// 			<span className="LastDateUser" style={{ color: "white" }}>
// 				{`Last edit: ${lastEditedDate}`}
// 			</span>
// 			<span className="IconUser" style={{ color: "white" }}>
// 				<Star userId={userId} noteId={noteId} />
// 				{" | "}
// 				<Remix remixNum={remixNum} /> {" | "}
// 				<Views viewsNum={viewsNum} />
// 			</span>
// 			{/* </>
//       )} */}
// 		</div>
// 	);
// };

// export default PublicNoteData;

import '../main.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getDatabase, ref, onValue, get } from 'firebase/database'
import Remix from '../../IconUtils/Remix'
import Views from '../../IconUtils/Views'
import Star from '../../IconUtils/Star'

const PublicNoteData = ({ userId, noteId }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const hasNIdParam = queryParams.has('NId')
  const [createdBy, setCreatedBy] = useState(null)
  const [lastEditedDate, setLastEditedDate] = useState(null)
  const [remixNum, setRemixNum] = useState(0)
  const [viewsNum, setViewsNum] = useState(0)
  const [noteTitle, setNoteTitle] = useState(null)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900)
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!hasNIdParam) {
      return // Do nothing if NId parameter is not present
    }

    const database = getDatabase()
    const noteRef = ref(database, `notes/${noteId}`)

    onValue(noteRef, snapshot => {
      const noteData = snapshot.val()
      if (noteData) {
        setCreatedBy(noteData.created_by)
        setLastEditedDate(new Date(noteData.created_at).toLocaleDateString())
        setRemixNum(noteData.remix)
        setViewsNum(noteData.views)
        setNoteTitle(noteData.title)
      }
    })
    // setIsDropdown(window.innerWidth <= 900)
  }, [hasNIdParam, noteId])

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
    return null // Return null if NId parameter is not present
  }

  //   const handleDropdownClick = () => {
  //     setIsDropdownOpen(!isDropdownOpen)
  //   }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className='User-Main'>
      {isSmallScreen && (
        <div className={`custom-dropdownUser ${isDropdownOpen ? 'open' : ''}`}>
          <div className='dropdown-header' onClick={toggleDropdown}>
            <span className='TitleUser'>{`Title: ${noteTitle}`}</span>
            <span className='dropdown-arrow'>&#9662;</span>
          </div>
          {isDropdownOpen && (
            <div className='dropdown-options-User'>
              <div className='option-User'>
                <span className='MainUser'>
                  {createdBy === userId
                    ? 'Your Note'
                    : `Created By: ${creatorUsername}`}
                </span>
              </div>
              <div className='option-User'>
                <span className='LastDateUser'>
                  {`Last edit: ${lastEditedDate}`}
                </span>
              </div>
              <div className='option-User'>
                <span className='IconUser'>
                  <Star userId={userId} noteId={noteId} />
                  {' | '}
                  <Remix remixNum={remixNum} /> {' | '}
                  <Views viewsNum={viewsNum} />
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {!isSmallScreen && (
        <div className='User-Main'>
          <span className='TitleUser'>{`Title: ${noteTitle}`}</span>
          <span className='MainUser'>
            {createdBy === userId
              ? 'Your Note'
              : `Created By: ${creatorUsername}`}
          </span>
          <span className='LastDateUser' style={{ color: 'white' }}>
            {`Last edit: ${lastEditedDate}`}
          </span>
          <span className='IconUser' style={{ color: 'white' }}>
            <Star userId={userId} noteId={noteId} />
            {' | '}
            <Remix remixNum={remixNum} /> {' | '}
            <Views viewsNum={viewsNum} />
          </span>
        </div>
      )}
    </div>
  )
}

export default PublicNoteData
