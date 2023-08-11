import React from 'react'
import { useState } from 'react'
import '../community.css'
import RemixCom from './Remix2'
import Stars from './Stars'
import NoteCard from './NoteCard'

const NotesData = () => {
  return (
    <div className='cardUpper'>
      <NoteCard
        noteTitle='SI and CI Engine'
        noteSubject='Thermal Engineering'
        noteCreator='Sohali'
        noteLastEdited='1-8-2023'
      />
      <NoteCard
        noteTitle='Clutch'
        noteSubject='Automobile Engineering'
        noteCreator='Manish'
        noteLastEdited='30-7-2023'
      />
      <NoteCard
        noteTitle='Classification of IC Engine'
        noteSubject='TE'
        noteCreator='Kunal'
        noteLastEdited='2-8-2023'
      />
    </div>
  )
}

export default NotesData
