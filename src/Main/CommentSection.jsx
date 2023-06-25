import React, { useState, useRef } from 'react';
import './main.css';
import CommentIcon from '../icons/discuss-line.png'

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return;
    setComments([...comments, commentText]);
    setCommentText('');
  };

  const toggleCommentSection = (e) => {
    e.preventDefault();
    setShowCommentSection((prevState) => !prevState);
  };

  return (
    <div>
      <div
        id='comment-section'
        className='comment-section'
        style={{ display: showCommentSection ? 'block' : 'none' }}
      >
        <div id='comment-list'>
          {/* Close button for the comment section */}
          <span
            className='close'
            id='close-save-form-button'
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => setShowCommentSection(false)}
          >
            &times;
          </span>
          {/* Display existing comments */}
          {comments.map((comment, index) => (
            <div className='comment' key={index}>
              {comment}
            </div>
          ))}
        </div>
        {/* Form for adding new comments */}
        <form id='comment-form' onSubmit={handleCommentSubmit}>
          <div className='comment-input-container'>
            <textarea
              id='comment-textarea'
              placeholder='Add a comment'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button type='submit'>Post</button>
          </div>
        </form>
      </div>
      <a href=' ' onClick={toggleCommentSection}>
        <img src={CommentIcon} alt='Comment' className='commic' />
      </a>
    </div>
  );
};

export default CommentSection;
