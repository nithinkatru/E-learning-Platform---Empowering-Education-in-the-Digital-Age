import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TakeExam.css';
import Back from "../common/back/Back";
import Sidebar from './Sidebar';

function TakeExam() {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
   
      
    useEffect(() => {
        axios.get('http://localhost:5000/api/quizzes')
            .then(response => setQuizzes(response.data))
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    const selectQuiz = (quizId) => {
        const quiz = quizzes.find(q => q._id === quizId);
        setCurrentQuiz(quiz);
        setAnswers({});
    };

    const handleOptionChange = (questionId, optionText) => {
        setAnswers({
            ...answers,
            [questionId]: optionText
        });
    };

    const handleSubmitAnswers = () => {
        if (!currentQuiz || !Object.keys(answers).length) {
            alert('Please complete the quiz before submitting.');
            return;
        }
    
        const formattedAnswers = currentQuiz.questions.map(question => ({
            questionId: question._id,
            answer: answers[question._id]  // Assuming `answers` state stores answers keyed by question ID
        }));
    
        axios.post('http://localhost:5000/api/submit-quiz', {
            quizId: currentQuiz._id,
            answers: formattedAnswers
        })
        .then(response => {
            console.log('Answers submitted:', response.data);
            setCurrentQuiz(null);
            setAnswers({});
            alert('Quiz submitted successfully.');
        })
        .catch(error => console.error('Submission error:', error));
    };
    
    return (
        <>
            <Back title='Take Exam' />
            
            <div className="TakeExam-container">
                <h1>Take Exam</h1>
                {currentQuiz === null ? (
                    <div>
                        <h2>Available Quizzes</h2>
                        <ul>
                            {quizzes.map(quiz => (
                                <li key={quiz._id}>
                                    {quiz.title}
                                    <button onClick={() => selectQuiz(quiz._id)}>Take Quiz</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2>{currentQuiz.title}</h2>
                        {currentQuiz.questions.map((question) => (
                            <div key={question._id}>
                                <p>{question.questionText}</p>
                                {question.options.map((option) => (
                                    <label key={option._id}>
                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            value={option.optionText}
                                            onChange={() => handleOptionChange(question._id, option.optionText)}
                                            checked={answers[question._id] === option.optionText}
                                        />
                                        {option.optionText}
                                    </label>
                                ))}
                            </div>
                        ))}
                        <button onClick={handleSubmitAnswers}>Submit Answers</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TakeExam;
