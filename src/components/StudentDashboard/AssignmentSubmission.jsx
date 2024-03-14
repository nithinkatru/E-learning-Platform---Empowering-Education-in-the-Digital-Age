// Allows students to submit assignments, with support for file uploads and text inputs.
import React, { useState } from 'react';

function AssignmentSubmission() {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle file and comment submission logic here
    console.log(file, comment);
  };

  return (
    <form onSubmit={handleSubmit} className="assignment-submission">
      <label htmlFor="fileUpload">Upload Assignment:</label>
      <input type="file" id="fileUpload" onChange={(e) => setFile(e.target.files[0])} />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment (optional)"></textarea>
      <button type="submit">Submit Assignment</button>
    </form>
  );
}

export default AssignmentSubmission;
