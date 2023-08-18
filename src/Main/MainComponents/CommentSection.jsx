import React, { useState } from "react";
import CommentIcon from "../../icons/discuss-line.png";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ userId, noteId }) => {
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [showCommentSection, setShowCommentSection] = useState(false);

	const database = getDatabase();
	const commentsRef = ref(database, `notes/${noteId}/Comments`);

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
							{comment.comment}
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
