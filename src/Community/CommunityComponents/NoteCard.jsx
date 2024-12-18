import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Views from "../../IconUtils/Views";
import Remix from "../../IconUtils/Remix";
import Star from "../../IconUtils/Star";
import { getDatabase, ref, get, set } from "firebase/database"; // Import the necessary Firebase functions

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
		<div className="card-data mb-4 rounded-3 shadow-sm">
			<div className="card-body-data">
				{/* <h1 className='card-title-clg1 pricing-card-title'></h1> */}
				<div className="CommunityData">
					<div id="Community-data" className="CommunityDataNote">
						<div className="data-row">
							{/* <h5>Note Title:</h5> */}
							<Link onClick={handleNoteTitleClick} to={`/index?NId=${noteId}`}>
								<span className="Title">{noteTitle}</span>
							</Link>
						</div>
					</div>
					<span>/</span>
					<div id="Community-data" className="CommunityDataSub">
						<div className="data-row">
							{/* <h5>Subject:</h5> */}
							<span className="subj">{noteSubject} </span>
						</div>
					</div>
				</div>
				<div id="Community-icon" className="CommunityIcon">
					<div className="CommunityCreator">
						<div className="data-row">
							<span className="By">By:</span>
							<span className="NameBy">{creatorUsername}</span>
						</div>
					</div>
					<div className="CommunityCreated">
						<div className="data-row">
							<span className="On">Last Edited:</span>
							<span className="DateOn">{noteLastEdited}</span>
						</div>
					</div>
				</div>
				<div className="CommunityDownloadIcon">
					<div className="CommunityStar">
						<div className="icon-row">
							<Star userId={userId} noteId={noteId} />
						</div>
					</div>
					<div className="CommunityRemix">
						<div className="icon-row">
							<Remix remixNum={remixNum} />
						</div>
					</div>
					<div className="CommunityView">
						<div className="icon-row">
							<Views viewsNum={viewsNum} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
