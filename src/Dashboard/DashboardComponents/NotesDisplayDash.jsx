import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import MyNotes from './My-Notes'
import ForkedNotes from './Forked-Notes'
import StarredNotes from './Starred-Notes'

function NotesDisplayDash () {
  // const navigate = useNavigate()
  // const [TopicName, setTopicName] = useState(null)
  const [selectedOption, setSelectedOption] = useState('my-notes')

  // useEffect(() => {
  //   const database = getDatabase()
  //   const queryRef = ref(database, `users/${userId}/Queries/${QueryId}/Query`)
  //   onValue(queryRef, snapshot => {
  //     const query = snapshot.val()
  //     setTopicName(query)
  //   })
  // }, [userId, QueryId])

  const handleOptionClick = option => {
    setSelectedOption(option)
  }

  return (
    <div className='col-save col-lg-9 col-md-8'>
      <div className='card-save-dash rounded-3 shadow-sm'>
        <div className='card-body-save personal-info'>
          <div className='card-notes-select'>
            <div className='row row-notes-select'>
              <div
                className={`col notes-select my-notes ${
                  selectedOption === 'my-notes' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('my-notes')}
              >
                <p className='notes-head'>My Notes</p>
              </div>
              <div
                className={`col notes-select forked-notes ${
                  selectedOption === 'forked-notes' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('forked-notes')}
              >
                <p className='notes-head'>Remixed Notes</p>
              </div>
              <div
                className={`col notes-select starred-notes ${
                  selectedOption === 'starred-notes' ? 'active' : ''
                }`}
                onClick={() => handleOptionClick('starred-notes')}
              >
                <p className='notes-head'>Starred Notes</p>
              </div>
            </div>
            <div className='card-Notes-display'>
              {selectedOption === 'my-notes' && <MyNotes />}
              {selectedOption === 'forked-notes' && <ForkedNotes />}
              {selectedOption === 'starred-notes' && <StarredNotes />}
            </div>

            {/* <h3 className='card-title-save pricing-card-title personal-info-title'>
            {' '}
            {TopicName}
          </h3> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesDisplayDash
