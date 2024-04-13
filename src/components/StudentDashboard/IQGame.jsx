import React, { useState } from 'react';
import './IQGame.css';

const IQGame = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Jupiter'
    }
  ];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert(`Quiz ended! Your score: ${score}/${questions.length}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <div>
      <h2>IQ Game</h2>
      {currentQuestion < questions.length && (
        <div>
          <h3>Question {currentQuestion + 1}</h3>
          <p>{questions[currentQuestion].question}</p>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} onClick={() => handleAnswer(option)}>
                {option}
              </li>
            ))}
          </ul>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default IQGame;
