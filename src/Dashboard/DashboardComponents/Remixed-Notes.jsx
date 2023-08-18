import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { getDatabase, ref, onValue } from "firebase/database";

const RemixedNotes = ({ userId }) => {
	const [notes, setNotes] = useState([]); // State to hold the fetched notes

	useEffect(() => {
		const database = getDatabase();
		const userNotesRef = ref(database, `users/${userId}/RemixedNotes`);

		onValue(userNotesRef, (snapshot) => {
			const notesData = snapshot.val();
			if (notesData) {
				const notesArray = Object.keys(notesData).map((noteId) => ({
					noteId,
					...notesData[noteId],
				}));
				setNotes(notesArray);
			}
		});
	}, [userId]);

	return (
		<div className="row row-notes-display">
			{notes.map((note) => (
				<NoteCard key={note.noteId} noteId={note.noteId} userId={userId} />
			))}
		</div>
	);
};

export default RemixedNotes;
