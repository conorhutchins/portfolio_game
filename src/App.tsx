import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './views/HomePage/HomePage';
import GameField from './views/GameField/GameField';
import EndSummary from './views/EndSummary/EndSummary';
import ContactPage from './views/ContactPage/ContactPage';
import Projects from './views/Projects/Projects';
import TechStack from './views/TechStack/TechStack';
import { ThemeProvider } from './theme/ThemeContext';
import ExperienceSection from './views/Experience/Experience';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          {/* Navigation Bar */}
          <Navigation />
          {/* Main App Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GameField />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path='/experience' element={<ExperienceSection />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/techstack" element={<TechStack />} />
            <Route path="/summary" element={<EndSummary />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
