// Allows students to leave feedback and rate courses or instructors, which can help other students make informed decisions and provide valuable feedback to course creators.
import React, { useState } from 'react';

function FeedbackRating({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, feedback });
    setRating(0); // Reset after submission
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="0">Choose a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Leave your feedback here..."></textarea>
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackRating;
