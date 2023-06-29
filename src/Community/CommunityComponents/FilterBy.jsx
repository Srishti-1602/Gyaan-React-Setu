import React from 'react'
import { useState } from 'react'
import '../community.css'

const FilterBy = () => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState('')
  const handleClearAll = () => {
    setSelectedCheckpoint(' ')
  }

  const handleCheckpointChange = event => {
    setSelectedCheckpoint(event.target.value)
    console.log(event.target.value)
  }
  return (
    <div className='card-filter mb-4 rounded-3 shadow-sm'>
      <div className='card-body-filter'>
        <h1 className='card-title pricing-card-title'>Filter by</h1>
        <div id='Community-check' className='Communitycheck'>
          <div className='checkpoints'>
            <div className='checkpoint'>
              <input
                type='radio'
                id='degree'
                value='degree'
                name='checkpoint'
                checked={selectedCheckpoint === 'degree'}
                onChange={handleCheckpointChange}
              />
              <label htmlFor='degree'>Degree</label>
            </div>
            <div className='checkpoint'>
              <input
                type='radio'
                id='school'
                value='school'
                name='checkpoint'
                checked={selectedCheckpoint === 'school'}
                onChange={handleCheckpointChange}
              />
              <label htmlFor='school'>School</label>
            </div>
            <div className='checkpoint'>
              <input
                type='radio'
                id='year'
                value='year'
                name='checkpoint'
                checked={selectedCheckpoint === 'year'}
                onChange={handleCheckpointChange}
              />
              <label htmlFor='year'>Year</label>
            </div>
            <div className='checkpoint'>
              <input
                type='radio'
                id='note-title'
                value='note-title'
                name='checkpoint'
                checked={selectedCheckpoint === 'note-title'}
                onChange={handleCheckpointChange}
              />
              <label htmlFor='note-title'>Note Title</label>
            </div>
            <div className='checkpoint'>
              <input
                type='radio'
                id='subject'
                value='subject'
                name='checkpoint'
                checked={selectedCheckpoint === 'subject'}
                onChange={handleCheckpointChange}
              />
              <label htmlFor='subject'>Subject</label>
            </div>
            <div className='checkpoint'>
              <input
                type='radio'
                id='branch'
                value='branch'
                name='checkpoint'
                checked={selectedCheckpoint === 'branch'}
                onChange={handleCheckpointChange}
              />
              <label htmlFor='subject'>Branch</label>
            </div>
          </div>

          {/* buttons for the functions  */}
          <div className='button-container'>
            <button
              className='btn btn-secondary'
              id='clear-all-button'
              onClick={handleClearAll}
            >
              Clear All
            </button>
            <button className='btn btn-primary' id='submit-button'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBy
