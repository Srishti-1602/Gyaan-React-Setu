import React, { useState, useEffect } from "react";
import Views from "../../IconUtils/Views";
import Remix from "../../IconUtils/Remix";
import Star from "../../IconUtils/Star";
import { getDatabase, ref, get, set } from "firebase/database";

const NoteCard = ({
	key,
	noteId,
	noteTitle,
	noteSubject,
	noteCreator,
	noteLastEdited,
	noteContent,
	starsNum,
	remixNum,
	viewsNum,
	userId,
}) => {
	const [creatorUsername, setCreatorUsername] = useState(""); // State to hold the creator's username

	console.log("noteId:", noteId);

	useEffect(() => {
		const database = getDatabase();
		const usersRef = ref(database, `users/${noteCreator}`);

		// Fetch the username from the users node based on noteCreator
		get(usersRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					const userData = snapshot.val();
					console.log("userData:", userData);
					setCreatorUsername(userData.username || "Unknown User");
				} else {
					setCreatorUsername("Unknown User");
				}
			})
			.catch((error) => {
				console.error("Error fetching username:", error);
				setCreatorUsername("Unknown User");
			});
	}, [noteCreator]);

	return (
		<div className="col-display col-lg-3 col-md-5 col-sm-5 note-rec">
			<div className="note-rec-head">
				<h3 className="card-title-note">{noteTitle}</h3>
			</div>
			<div className="note-rec-body">
				<p>Subject: {noteSubject}</p>
				<p>Creator: {creatorUsername}</p>
				<p>Last Edited: {noteLastEdited}</p>
				{/* <p>Comments: </p> */}
			</div>
			<div className="icon-my-notes">
				<ul>
					<li>
						<Remix remixNum={remixNum} />
					</li>
					<li>
						<Star userId={userId} noteId={"-Nbhzu5nn--2osZw_-wD"} />
					</li>
					<li>
						<Views viewsNum={viewsNum} />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NoteCard;
