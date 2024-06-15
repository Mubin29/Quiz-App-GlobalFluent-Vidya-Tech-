
import React from 'react';

const Result = () => {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

  return (
    <div className='p-5 shadow-2xl mx-[10rem] pb-12 ' >
      <div className="md:w-[80%] sm:w-[95%] w-[98%] mx-auto p-4 flex flex-wrap">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        {results.map((result, index) => (
          <div key={index} className="border p-4 mb-4 rounded shadow flex flex-wrap">
            <h3 className="text-xl font-semibold mb-2">{result.quiz}</h3>
            <div className="grid grid-cols-2 gap-4">
              {quizzes.find((quiz) => quiz.title === result.quiz).questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-2">
                  <p className="font-medium">{question.text}</p>
                  <p className={`font-medium ${question.correct === result.answers[qIndex] ? 'text-green-600' : 'text-red-600'}`}>
                    Your Answer: {result.answers[qIndex]}
                  </p>
                  <p className="font-medium">Correct Answer: {question.correct}</p>
                </div>
              ))}
            </div>
            <p className="font-medium">Score: {result.score}/{result.answers.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
