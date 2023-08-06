import React, { useEffect, useState } from 'react'
import NoteCard from './NoteCard'
// import Views from '../../icons/spy-fill.png'

const ForkedNotes = () => {
  return (
    <div className='row row-notes-display'>
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteLastEdited="Date" remixNum="1" starsNum="12" viewsNum="123" />
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteLastEdited="Date" remixNum="1" starsNum="12" viewsNum="123" />
    </div>
  )
}

export default ForkedNotes
