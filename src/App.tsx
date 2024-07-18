import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import GameField from './views/GameField/GameField';
import EndSummary from './views/EndSummary/EndSummary';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GameField />} />
          <Route path="/summary" element={<EndSummary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
