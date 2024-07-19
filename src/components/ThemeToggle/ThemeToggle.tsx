import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../theme/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="switch-container">
      <input type="checkbox" id="switch" onChange={toggleTheme} checked={isDarkMode} />
      <label htmlFor="switch" className="switch">
        <FontAwesomeIcon icon={faSun} className="sun" />
        <FontAwesomeIcon icon={faMoon} className="moon" />
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
