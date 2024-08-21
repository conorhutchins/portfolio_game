import React from 'react';
import { useNavigate } from 'react-router-dom';
import backButton from '../../assets/backButton.svg';
import styles from './BackButton.module.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleClick} className={styles.backButton}>
      <img src={backButton} alt="Back button" className={styles.backButtonImage}/>
    </button>
  );
};

export default BackButton;