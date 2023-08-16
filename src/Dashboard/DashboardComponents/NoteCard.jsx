import React, { useState, useEffect } from "react";
import Views from "../../IconUtils/Views";
import Remix from "../../IconUtils/Remix";
import Star from "../../IconUtils/Star";
import { getDatabase, ref, onValue, get, set } from "firebase/database";
import { Link } from "react-router-dom";

const NoteCard = ({ key, noteId, userId }) => {
	const [noteData, setNoteData] = useState({
		title: "Loading...",
		subject: "Loading...",
		noteCreator: "Loading...",
		noteLastEdited: "Loading...",
		remixNum: "Loading...",
		viewsNum: "Loading...",
		starsNum: "Loading...",
	});

	const database = getDatabase();

	useEffect(() => {
		const noteRef = ref(database, `notes/${noteId}`);

		onValue(noteRef, (snapshot) => {
			const note = snapshot.val();
			if (note) {
				setNoteData({
					title: note.title || "No Title",
					subject: note.subject || "No Subject",
					noteCreator: note.created_by || "Unknown User",
					noteLastEdited:
						new Date(note.created_at).toLocaleDateString() || "Unknown Date",
					remixNum: note.remixes || 0,
					viewsNum: note.views || 0,
					starsNum: note.stars || 0,
				});
			}
		});
	}, [noteId]);

	const [creatorUsername, setCreatorUsername] = useState(""); // State to hold the creator's username

	useEffect(() => {
		if (noteData.noteCreator !== "Loading...") {
			const userNameRef = ref(
				database,
				`users/${noteData.noteCreator}/username`
			);

			get(userNameRef)
				.then((snapshot) => {
					const username = snapshot.val();
					setCreatorUsername(username || "Unknown User");
				})
				.catch((error) => {
					console.error("Error fetching username:", error);
					setCreatorUsername("Unknown User");
				});
		}
	}, [noteData.noteCreator]);

	const handleNoteTitleClick = () => {
		const database = getDatabase();
		const noteViewsRef = ref(database, `notes/${noteId}/views`);

		get(noteViewsRef)
			.then((snapshot) => {
				const currentViews = snapshot.val() || 0;
				const updatedViews = currentViews + 1;

				set(noteViewsRef, updatedViews)
					.then(() => {
						// Views count updated successfully
						console.log("Views count updated.");
					})
					.catch((error) => {
						console.error("Error updating views count:", error);
					});
			})
			.catch((error) => {
				console.error("Error fetching views count:", error);
			});
	};

	return (
		<div className="col-display col-lg-3 col-md-5 col-sm-5 note-rec">
			<Link onClick={handleNoteTitleClick} to={`/index?NId=${noteId}`}>
				<div className="note-rec-head">
					<h3 className="card-title-note">{noteData.title}</h3>
				</div>
				<div className="note-rec-body">
					<p>Subject: {noteData.subject}</p>
					<p>Creator: {creatorUsername}</p>
					<p>Last Edited: {noteData.noteLastEdited}</p>
					{/* <p>Comments: </p> */}
				</div>
			</Link>
			<div className="icon-my-notes">
				<ul>
					<li>
						<Remix remixNum={noteData.remixNum} />
					</li>
					<li>
						<Star userId={userId} noteId={noteId} />
					</li>
					<li>
						<Views viewsNum={noteData.viewsNum} />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NoteCard;
