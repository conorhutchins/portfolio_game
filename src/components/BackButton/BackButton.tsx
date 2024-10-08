import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp, IoArrowBackCircleOutline } from 'react-icons/io5';
import styles from './BackButton.module.css';
import { useTheme } from '../../theme/ThemeContext';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode }  = useTheme()

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleClick} className={styles.backButton}>
     { isDarkMode ? <IoArrowBackCircleOutline size={50} /> : <IoArrowBackCircleSharp size={50} /> }
    </button>
  );
};

export default BackButton;