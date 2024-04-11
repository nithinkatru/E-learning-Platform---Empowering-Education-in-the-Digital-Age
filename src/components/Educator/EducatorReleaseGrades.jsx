import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EducatorReleaseGrades() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState('');
  const [grade, setGrade] = useState('');

  // Fetch submissions on component mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions-grades');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/submit-grade', {
        submissionId: selectedSubmission,
        grade: grade,
      });
      alert('Grade released successfully');
      // Additional steps could include refreshing the list of submissions
    } catch (error) {
      alert('Failed to release grade');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setSelectedSubmission(e.target.value)} value={selectedSubmission}>
        <option value="">Select a submission</option>
        {submissions && submissions.map((submission) => (
          <option key={submission._id} value={submission._id}>
            {submission.studentName} - {submission.quizTitle}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
      <button type="submit">Release Grade</button>
    </form>
  );
}

export default EducatorReleaseGrades;
