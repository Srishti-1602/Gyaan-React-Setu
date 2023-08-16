import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { getDatabase, ref, onValue } from "firebase/database";

const MyNotes = ({ userId }) => {
	const [notes, setNotes] = useState([]); // State to hold the fetched notes

	useEffect(() => {
		const database = getDatabase();
		const userNotesRef = ref(database, `users/${userId}/MyNotes`);

		// Fetch the notes data
		onValue(userNotesRef, (snapshot) => {
			const notesData = snapshot.val();
			if (notesData) {
				const notesArray = Object.values(notesData); // Convert object values to an array
				setNotes(notesArray);
			}
		});
	}, [userId]);

	return (
		<div className="row row-notes-display">
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
					userId={userId}
				/>
			))}
		</div>
	);
};

export default MyNotes;
