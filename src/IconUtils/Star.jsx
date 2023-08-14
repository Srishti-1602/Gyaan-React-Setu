import React, { useRef, useState } from "react";
import StarIcon from "../icons/star.png";
import UnstarIcon from "../icons/star-shape.png";

const Star = ({ noteId }) => {
	const [isStarred, setIsStarred] = useState(false); // State to track the starred/unstarred status
	const rectNotesRef = useRef(null);

	const toggleStar = () => {
		setIsStarred(!isStarred); // Toggle the state on each click
	};

	const iconSrc = isStarred ? UnstarIcon : StarIcon;
	const iconAlt = isStarred ? "Unstar" : "Star";

	return (
		<a onClick={toggleStar}>
			<img
				src={iconSrc}
				alt={iconAlt}
				className="Like"
				id="like"
				style={{ cursor: "pointer" }} // Apply the pointer cursor style
			/>
			{"  "}
			{"2"}
		</a>
	);
};

export default Star;

/* import React, { useRef, useState, useEffect } from "react";
import { getDatabase, ref, update, onValue } from "firebase/database";
import StarIcon from "../icons/star.png";
import UnstarIcon from "../icons/star-shape.png";

const Star = ({ noteId }) => {
	const [isStarred, setIsStarred] = useState(false);
	const [starsNum, setStarsNum] = useState(0);
	const rectNotesRef = useRef(null);
	const database = getDatabase();
	const noteStarsRef = ref(database, `notes/${noteId}/stars`);

	useEffect(() => {
		const starsListener = onValue(noteStarsRef, (snapshot) => {
			const starsValue = snapshot.val();
			setStarsNum(starsValue);
		});

		return () => {
			// Unsubscribe the listener when the component unmounts
			if (starsListener) {
				starsListener();
			}
		};
	}, [noteId, noteStarsRef]);

	const toggleStar = () => {
		const updatedStarsNum = isStarred ? starsNum - 1 : starsNum + 1;

		// Construct the update object
		const updateData = { [`notes/${noteId}/stars`]: updatedStarsNum };

		// Perform the update operation
		update(ref(database), updateData)
			.then(() => {
				setIsStarred(!isStarred);
				setStarsNum(updatedStarsNum);
			})
			.catch((error) => {
				console.error("Error updating stars:", error);
			});
	};

	const iconSrc = isStarred ? StarIcon : UnstarIcon;
	const iconAlt = isStarred ? "Unstar" : "Star";

	return (
		<span onClick={toggleStar}>
			<img
				src={iconSrc}
				alt={iconAlt}
				className="Like"
				id="like"
				style={{ cursor: "pointer" }}
			/>
			{"  "}
			{starsNum}
		</span>
	);
};

export default Star;
 */
