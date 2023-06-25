import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './main.css'

const SaveButton = () => {
  const navigate = useNavigate();
  const [showSaveNote, setShowSaveNote] = useState(false);
  const isLoggedIn = true; // Placeholder for isLoggedIn check

  const handleSaveButtonClick = () => {
    if (isLoggedIn) {
      setShowSaveNote(true);
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };

  const handleSaveSubmit = (event) => {
    event.preventDefault();
    // Form submission logic
  };

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
