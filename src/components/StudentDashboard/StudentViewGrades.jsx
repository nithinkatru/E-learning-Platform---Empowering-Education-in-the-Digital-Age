import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './StudentWelcome.css'

function StudentViewGrades() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/submissions');
                setSubmissions(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching submissions: ' + error.message);
                console.error('Error fetching submissions:', error);
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <div className="grades-container">
            <h2><FontAwesomeIcon icon={faCheckCircle} /> Your Grades</h2>
            {loading && <FontAwesomeIcon icon={faSpinner} spin />}
            {error && <p className="error"><FontAwesomeIcon icon={faTimesCircle} /> {error}</p>}
            <ul>
                {submissions.length > 0 ? submissions.map((submission) => (
                    <li key={submission._id}>
                        <strong>{submission.quizId.title}</strong> - Grade: 
                        {submission.percentage !== undefined ? 
                        `${submission.percentage.toFixed(2)}%` : 
                        'Not graded yet'}
                    </li>
                )) : !loading && <p>No submissions found.</p>}
            </ul>
        </div>
    );
}

export default StudentViewGrades;
