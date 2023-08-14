import React, { useState, useEffect } from "react";
import "../community.css";
import NoteCard from "./NoteCard";
import { getDatabase, ref, onValue } from "firebase/database";

const NotesData = () => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const database = getDatabase();
		const notesRef = ref(database, "notes");

		onValue(notesRef, (snapshot) => {
			const notesData = snapshot.val();
			if (notesData) {
				const notesArray = Object.keys(notesData).map((noteId) => ({
					noteId,
					...notesData[noteId],
				}));
				setNotes(notesArray);
			}
		});
	}, []);

	return (
		<div className="cardUpper">
			{notes.map((note) => (
				<NoteCard
					key={note.noteId}
					noteId={note.noteId}
					noteTitle={note.title}
					noteSubject={note.subject}
					noteCreator={note.created_by}
					noteLastEdited={new Date(note.created_at).toLocaleDateString()}
					noteContent={note.noteContent}
					starsNum={note.stars}
					remixNum={note.remix}
					viewsNum={note.views}
				/>
			))}
		</div>
	);
};

export default NotesData;
