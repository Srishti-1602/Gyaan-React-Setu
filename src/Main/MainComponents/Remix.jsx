import React, { useState, useEffect } from "react";
import RemixIcon from "../../icons/share-forward-box-line.png";
import "../main.css";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, update, set, onValue, get } from "firebase/database";
import {
	getFirestore,
	collection,
	addDoc,
	doc,
	getDoc,
} from "firebase/firestore";

const RemixButton = ({ userId, noteId, isLoggedIn }) => {
	const navigate = useNavigate();
	const [showRemixNote, setShowRemixNote] = useState(false);

	const handleRemixClick = () => {
		if (isLoggedIn) {
			console.log("Remix button clicked");
			setShowRemixNote(true);
		} else {
			navigate("/login");
		}
	};

	const database = getDatabase();

	/* Get User Data */
	const [noteData, setNoteData] = useState(null);
	useEffect(() => {
		const userRef = ref(database, `notes/${noteId}`);

		onValue(userRef, (snapshot) => {
			const noteDataValue = snapshot.val();
			setNoteData(noteDataValue);
			console.log("Note Data:", noteData);
		});
	}, [noteId]);
	/* End of Get User Data */

	const noteContentRef = ref(database, `notes/${noteId}/noteContent`);
	const firestore = getFirestore();

	const handleRemixSubmit = async (event) => {
		event.preventDefault();

		const remixTitle = document.getElementById("remix-title").value;
		const remixSubject = document.getElementById("remix-subject").value;

		// Read the content of the original note from Firestore
		const snapshot = await get(noteContentRef);
		const originalNoteContent = snapshot.val();
		const docRef = doc(firestore, "notes", originalNoteContent);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// Create a new document in Firestore's 'notes' collection for the remixed note
			const collectionRef = collection(firestore, "notes"); // Initialize collectionRef

			addDoc(collectionRef, {
				jsonData: docSnap.data().jsonData, // Assuming the originalNoteContent is in JSON format
			})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef.id);
					const uniqueFirestoreId = docRef.id;

					/* Update User Notes Data for Dashboard Page */
					const userMyNotesRef = ref(
						database,
						`users/${userId}/RemixedNotes/${uniqueFirestoreId}`
					);
					set(userMyNotesRef, true);
					/* END OF Update User Notes Data for Dashboard Page */

					/* Save data for Dashboard Page */
					//const notesRefToUpdate = ref(database, `notes/${queryId}`);
					//set(notesRefToUpdate, newNoteData);
					/* END OF Save data for Dashboard Page */

					/* Save data for Community Page */
					const school = noteData.school;
					const course = noteData.course;
					const department = noteData.department;
					const owner = noteData.owner;

					const communityNoteData = {
						title: remixTitle,
						subject: remixSubject,
						noteContent: uniqueFirestoreId,
						created_by: userId,
						created_at: Date.now(),
						forked: true,
						forked_from: noteId,
						owner: owner,
						stars: 0,
						views: 0,
						remix: 0,
						private: true,
						school: school,
						course: course,
						department: department,
					};

					const communityRef = ref(database, `notes/${uniqueFirestoreId}`);
					set(communityRef, communityNoteData);
					// Close the remix form after successful remixing
					setShowRemixNote(false);
					window.location.href = `/index?NId=${uniqueFirestoreId}`;
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
		}

		//const newNoteId = newDocRef.id; // Get the ID of the newly created document

		// Update the Realtime Database with the remixed note information
		/* const remixedNotesRef = ref(
			database,
			`users/${userId}/RemixedNotes/${newNoteId}`
		);
		await set(remixedNotesRef, {
			remixedNoteContent: newNoteId,
			remixedFrom: noteId,
			title: title,
			subject: subject,
			created_at: Date.now(),
		}); */

		// You can redirect the user to the newly remixed note page or perform other actions here
	};

	return (
		<div>
			<div
				className="card text-white save-note"
				id="save-in-rect"
				style={{ display: showRemixNote ? "block" : "none" }}>
				<span
					className="close"
					id="close-save-form-button"
					onClick={() => setShowRemixNote(false)}>
					&times;
				</span>

				<div className="p-5 text-center card-save">
					<div className="containInfo">
						<h2 className="fw-bold mb-2 text-uppercase save-head">
							Remix Note
						</h2>
						<div className="save-inforec">
							<div className="save-info">
								{/* Form for saving notes */}
								<form id="remixnote-form" onSubmit={handleRemixSubmit}>
									<input
										type="text"
										className="save-title-Note"
										id="remix-title"
										placeholder="Note Title"
										required
									/>
									<input
										type="text"
										className="save-title-Sub"
										id="remix-subject"
										placeholder="Subject"
										required
									/>
									<button type="submit" className="sign-up" id="save-button">
										Remix
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a onClick={handleRemixClick}>
				<img src={RemixIcon} alt="Remix" className="remixic" id="scrollid" />
				{/* <span className='remix-text'>Remix</span> */}
			</a>
		</div>
	);
};

export default RemixButton;

// When the remix button is clicked, make SaveButton visible
// From `notes/${noteId}/noteContent` read the unique firestore ID and copy the data of the content saved inside that firestore key to a new unique key for remixed note
// Create new unique note Id in realtime db `users/${userId}/RemixedNotes/uniqueRemixID`
//Inside that unique ID store: remixedNoteContent:uniqueFirestoreId, remixedFrom: {noteId}
