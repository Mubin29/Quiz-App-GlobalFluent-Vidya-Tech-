
import React, { useState } from 'react';

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false); 

  const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

  const handleAnswer = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const submitQuiz = () => {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    let totalScore = 0;
    selectedQuiz.questions.forEach((question, index) => {
      if (question.correct === answers[index]) {
        totalScore++;
      }
    });
    setScore(totalScore);
    results.push({ quiz: selectedQuiz.title, answers, score: totalScore });
    localStorage.setItem('results', JSON.stringify(results));
    setSubmitted(true);
    setShowResults(true);
  };

  return (
    <div className='p-5 shadow-2xl mx-[10rem] pb-12' >
    <div className="md:w-[80%] sm:w-[95%] w-[98%] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select a Quiz</h2>
      <select
        onChange={(e) => setSelectedQuiz(quizzes.find((quiz) => quiz.title === e.target.value))}
        className="border rounded p-2 w-full mb-4"
      >
        <option value="">Select</option>
        {quizzes.map((quiz, index) => (
          <option key={index} value={quiz.title}>
            {quiz.title}
          </option>
        ))}
      </select>
      {selectedQuiz && !submitted && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{selectedQuiz.title}</h3>
          {selectedQuiz.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{question.text}</p>
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswer(index, option)}
                    className="mr-2"
                  />
                  <label>{option}</label>
                </div>
              ))}
              {showResults && (
                <p className={`font-medium ${question.correct === answers[index] ? 'text-green-600' : 'text-red-600'}`}>
                  {question.correct === answers[index] ? 'Correct' : 'Wrong'}
                </p>
              )}
            </div>
          ))}
          <button
            onClick={submitQuiz}
            className="bg-green-500 text-white p-2 rounded"
          >
            Submit Quiz
          </button>
        </div>
      )}
      {submitted && (
        <div className="mt-4">
          <p className="text-xl font-semibold mb-2">Quiz Submitted!</p>
          <p className="font-medium">Score: {score}/{selectedQuiz.questions.length}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Quiz;
