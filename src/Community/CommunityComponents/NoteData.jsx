import React from 'react'
import { useState } from 'react'
import '../community.css'
import RemixCom from './Remix2'
import Stars from './Stars'
import NoteCard from './NoteCard'

const NotesData = () => {
  return (
    <div className='cardUpper'>
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteDate="Date"/>
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteDate="Date" />
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteDate="Date" />
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteDate="Date" />
      <NoteCard noteTitle="Title" noteSubject="Subject" noteCreator="Creator" noteDate="Date" />
    </div>
  )
}

export default NotesData
