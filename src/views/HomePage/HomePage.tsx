import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import CoolObject from '../../components/CoolObject/CoolObject';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const fullText = 'Conor Hutchins Portfolio Site 💻';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.classList.add('homepage-background');
    return () => {
      document.body.classList.remove('homepage-background');
    };
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100); // Adjust the typing speed here (milliseconds)
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, fullText]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      navigate(`/game?name=${name}`);
    }
  };

  return (
    <>
      {/* CoolObject as a full-screen background */}
      <div className={styles.homePageCoolObject}>
        <CoolObject />
      </div>

      {/* Main content overlaid on top */}
      <div className={styles.homePageContent}>
        <h1 className={styles.typingHeader}> 
          {displayedText}
          <span className={styles.cursor}>|</span>
        </h1>
        <p>
          👋 Hi I'm Conor, I'm a Software Engineer who specialises in{' '}
          <span className={styles.boldUnderlined}>Javascript</span>,{' '}
          <span className={styles.boldUnderlined}>Typescript</span>,{' '}
          <span className={styles.boldUnderlined}>ReactJS</span> and{' '}
          <span className={styles.boldUnderlined}>React Native</span>
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className={styles.input}
            required
          />
          <p>
            This site has been built with{' '}
            <span className={styles.boldUnderlined}>Typescript</span>,{' '}
            <span className={styles.boldUnderlined}>ReactJS</span>,{' '}
            <span className={styles.boldUnderlined}>ReactJS Hooks</span> and{' '}
            <span className={styles.boldUnderlined}>CSS Modules</span>
          </p>
          <p className={styles.howToPlay}>
            How to play
            <br />
            <span className={styles.instructions}>
              Use your mouse to move around and consume items of interest to you!
            </span>
          </p>
          <button type="submit" className={styles.startButton}>
            START
          </button>
        </form>
        <a href="/projects" className={styles.workExamplesLink}>
          Go straight to work examples
        </a>
      </div>
    </>
  );
};

export default HomePage;