import React, { useState } from "react";
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
	const noteContentRef = ref(database, `notes/${noteId}/noteContent`);
	const firestore = getFirestore();

	const handleRemixSubmit = async (event) => {
		event.preventDefault();

		const title = document.getElementById("save-title").value;
		const subject = document.getElementById("save-subject").value;

		// Read the content of the original note from Firestore
		const snapshot = await get(noteContentRef);
		const originalNoteContent = snapshot.val();
		const docRef = doc(firestore, "notes", originalNoteContent);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// Create a new document in Firestore's 'notes' collection for the remixed note
			const collectionRef = collection(firestore, "notes"); // Initialize collectionRef

			const newDocRef = await addDoc(collectionRef, {
				jsonData: docSnap.data().jsonData, // Assuming the originalNoteContent is in JSON format
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

		// Close the remix form after successful remixing
		setShowRemixNote(false);

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
								<form id="savenote-form" onSubmit={handleRemixSubmit}>
									<input
										type="text"
										className="save-title-Note"
										id="save-title"
										placeholder="Note Title"
										required
									/>
									<input
										type="text"
										className="save-title-Sub"
										id="save-subject"
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
