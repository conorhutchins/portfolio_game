import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="switch-container">
      <input type="checkbox" id="switch" onChange={toggleTheme} checked={isDarkMode} />
      <label htmlFor="switch">
        <i className="fas fa-sun"></i>
        <i className="fas fa-moon"></i>
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
