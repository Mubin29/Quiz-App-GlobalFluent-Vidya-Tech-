
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Admin from './components/Admin';
import Quiz from './components/Quiz';
import Result from './components/Result';

const App = () => {
  const results = JSON.parse(localStorage.getItem('results')) || [];

  const getTotalScore = () => {
    let totalScore = 0;
    results.forEach((result) => {
      totalScore += result.score;
    });
    return totalScore;
  }
  return (

    <div className="container mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" >Quiz App</h1>
          <p className="text-xl font-semibold text-gray-600 mb-4">Total Score: {getTotalScore()}</p>
          <div className="flex justify-center">
            <Link to="/admin" className="bg-blue-500 hover:shadow-md hover:border-2 hover:rounded-full  hover:shadow-blue-600 text-white p-2 rounded-lg mr-4 hover:bg-blue-600">Admin</Link>
            <Link to="/quiz" className="bg-green-500 text-white p-2 hover:border-2 hover:rounded-full  rounded-lg mr-4 hover:bg-green-600 hover:shadow-md hover:shadow-green-600">Quiz</Link>
            <Link to="/result" className="bg-purple-500 text-white p-2  hover:border-2 hover:rounded-full rounded-lg hover:bg-purple-600 hover:shadow-md hover:shadow-purple-600">Result</Link>
          </div>
        </header>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/" element={< Quiz />} />
         
      </Routes>
    </div>

  );
};

export default App;
