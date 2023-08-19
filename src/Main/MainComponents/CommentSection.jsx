import React, { useState, useEffect } from "react";
import CommentIcon from "../../icons/discuss-line.png";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

const CommentSection = ({ userId, noteId }) => {
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [showCommentSection, setShowCommentSection] = useState(false);
	const [usernames, setUsernames] = useState({}); // State to store usernames

	const database = getDatabase();
	const commentsRef = ref(database, `notes/${noteId}/Comments`);

	// Function to parse comment data and add it to the state
	const parseCommentData = (snapshot) => {
		const commentsData = snapshot.val();
		if (commentsData) {
			const parsedComments = Object.values(commentsData);
			setComments(parsedComments);
		} else {
			setComments([]);
		}
	};

	useEffect(() => {
		// Listen for changes to the commentsRef
		onValue(commentsRef, parseCommentData);
	}, [commentsRef]);

	// Function to fetch usernames
	const fetchUsername = (userId) => {
		const usernameRef = ref(database, `users/${userId}/username`);
		onValue(usernameRef, (snapshot) => {
			const username = snapshot.val() || "Unknown User";
			setUsernames((prevUsernames) => ({
				...prevUsernames,
				[userId]: username,
			}));
		});
	};

	// Fetch usernames for commentors
	useEffect(() => {
		comments.forEach((comment) => {
			const commentorId = comment.commentor;
			if (!usernames[commentorId]) {
				fetchUsername(commentorId);
			}
		});
	}, [comments, usernames]);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (commentText.trim() === "") return;

		const commentData = {
			comment: commentText,
			commentor: userId,
			commentDate: Date.now(),
		};

		// Push the comment data to the realtime database
		push(commentsRef, commentData);

		// Clear the comment text after submitting
		setCommentText("");
	};

	const toggleCommentSection = (e) => {
		e.preventDefault();
		setShowCommentSection((prevState) => !prevState);
	};

	return (
		<div>
			<div
				id="comment-section"
				className="comment-section"
				style={{ display: showCommentSection ? "block" : "none" }}>
				<div id="comment-list">
					<span
						className="close"
						id="close-save-form-button"
						style={{ cursor: "pointer", color: "white" }}
						onClick={() => setShowCommentSection(false)}>
						&times;
					</span>
					{comments.map((comment, index) => (
						<div className="comment" key={index}>
							<p>
								Commented by: {usernames[comment.commentor] || "Loading..."}
							</p>
							<p>{comment.comment}</p>
							<p>Date: {new Date(comment.commentDate).toLocaleString()}</p>
						</div>
					))}
				</div>
				<form id="comment-form" onSubmit={handleCommentSubmit}>
					<div className="comment-input-container">
						<textarea
							id="comment-textarea"
							placeholder="Add a comment"
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}></textarea>
						<button type="submit">Post</button>
					</div>
				</form>
			</div>
			<a href=" " onClick={toggleCommentSection}>
				<img src={CommentIcon} alt="Comment" className="commic" />
			</a>
		</div>
	);
};

export default CommentSection;
