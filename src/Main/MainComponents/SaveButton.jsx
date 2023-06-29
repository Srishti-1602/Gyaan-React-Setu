import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../main.css'
import { getDatabase, ref, update, set, onValue } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const SaveButton = ({ jsonData, queryRef, isLoggedIn, UserID }) => {
  const navigate = useNavigate();
  const [showSaveNote, setShowSaveNote] = useState(false);

  /* Get User Data */
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const database = getDatabase();
    const userRef = ref(database, `users/${UserID}`);

    onValue(userRef, (snapshot) => {
      const userDataValue = snapshot.val();
      setUserData(userDataValue);
      console.log('userData:', userData);
    });
  }, [UserID]);
  /* End of Get User Data */


  /* Save Button Click */
  const handleSaveButtonClick = () => {
    if (isLoggedIn) {
      setShowSaveNote(true);
      console.log('jsonData:', jsonData); // Print the jsonData to the console
      console.log('queryRef:', queryRef); // Print the queryRef to the console
      console.log('UserID:', UserID); // Print the UserID to the console
      console.log('userData:', userData); // Print the userData to the console
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };
  /* End of Save Button Click */


  /* Save Form Submit */
  const handleSaveSubmit = async (event) => {
    event.preventDefault();
    const title = document.getElementById('save-title').value;
    const subject = document.getElementById('save-subject').value;

    // Update the form values in the Firebase Realtime Database
    const database = getDatabase();
    const queryRefNode = ref(database, queryRef);
    await update(queryRefNode, {
      Query: title,
      Subject: subject,
    });

    await set(queryRefNode, {
      Note_title: title,
      
    });
    

    // Save the jsonData in Firestore with a unique ID
    const firestore = getFirestore();
    const collectionRef = collection(firestore, 'notes');

    const jsonDataString = JSON.stringify(jsonData);

    addDoc(collectionRef, {
      jsonData: jsonDataString,
    })
      .then((docRef) => {
        const uniqueFirestoreId = docRef.id;
        console.log('Unique Firestore ID:', uniqueFirestoreId);
        const queryRefToUpdate = ref(database, `${queryRef}/Saved`);
        set(queryRefToUpdate, uniqueFirestoreId);
        const notesRefToUpdate = ref(database, `notes/${title}`); //UNIMPORTANT
        set(notesRefToUpdate, uniqueFirestoreId); //UNIMPORTANT
        /* Save data for Community Page */
        const userRef = ref(database, `users/${UserID}`);

        console.log('userData:', userData);

        const school = userData.school;
        const course = userData.course;
        const department = userData.department;

        const communityRefToUpdate = ref(database, `community/${school}/${course}/${department}/${uniqueFirestoreId}`);
        set(communityRefToUpdate, {
          title: title,
          created_by: UserID,
          created_at: Date.now(),
          forked: false,
          forked_from: null,
          ownner: UserID,
        });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };
  /* End of Save Form Submit */

  return (
    <div>
      <div
        className='card bg-dark text-white save-note'
        id='save-in-rect'
        style={{ display: showSaveNote ? 'block' : 'none' }}
      >
        <span
          className='close'
          id='close-save-form-button'
          onClick={() => setShowSaveNote(false)}
        >
          &times;
        </span>

        <div className='card-body p-5 text-center card-save'>
          <div className='mb-md-5 mt-md-4 pb-5'>
            <h2 className='fw-bold mb-2 text-uppercase save-head'>Save Note</h2>
            <div className='save-inforec'>
              <div className='save-info'>
                {/* Form for saving notes */}
                <form id='savenote-form' onSubmit={handleSaveSubmit}>
                  <input
                    type='text'
                    className='save-title'
                    id='save-title'
                    placeholder='Note Title'
                    required
                  />
                  <input
                    type='text'
                    className='save-title'
                    id='save-subject'
                    placeholder='Subject'
                    required
                  />
                  <button type='submit' className='sign-up' id='save-button'>
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type='button'
        className='savebutt'
        id='save-prompt-button'
        onClick={handleSaveButtonClick}
      >
        Save
      </button>
    </div>
  );
};

export default SaveButton;