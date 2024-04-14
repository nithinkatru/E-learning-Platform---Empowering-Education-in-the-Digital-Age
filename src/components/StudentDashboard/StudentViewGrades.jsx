import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentViewGrades() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                // Update the endpoint to fetch all submissions
                const response = await axios.get('http://localhost:5000/api/submissions');
                setSubmissions(response.data);
            } catch (error) {
                setError('Error fetching submissions: ' + error.message);
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, []); // Dependency array is empty to run only once after the component mounts

    return (
        <div>
            <h2>Your Grades</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {submissions.length > 0 ? submissions.map((submission) => (
                    <li key={submission._id}>
                        {submission.quizId.title} - Grade: {submission.percentage !== undefined ? `${submission.percentage.toFixed(2)}%` : 'Not graded yet'}
                    </li>
                )) : <p>No submissions found.</p>}
            </ul>
        </div>
    );
}

export default StudentViewGrades;
