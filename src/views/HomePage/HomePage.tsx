import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      navigate(`/game?name=${name}`);
    }
  };

  return (
    <div className={styles.homePage}>
      <h1>Conor Hutchins - Portfolio Site</h1>
      <p>👋 Hi I'm Conor, I'm a Software Engineer who specialises in <span className={styles.boldUnderlined}>Javascript</span>, <span className={styles.boldUnderlined}>Typescript</span>, <span className={styles.boldUnderlined}>ReactJS</span> and <span className={styles.boldUnderlined}>React Native</span></p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className={styles.input}
          required
        />
        <p>This site has been built with <span className={styles.boldUnderlined}>Typescript</span>, <span className={styles.boldUnderlined}>ReactJS</span>, <span className={styles.boldUnderlined}>ReactJS Hooks</span> and <span className={styles.boldUnderlined}>CSS Modules</span>.</p>
        <p className={styles.howToPlay}>
          How to play<br />
          <span className={styles.instructions}>Use your mouse to move around and consume items of interest to you!</span>
        </p>
        <button type="submit" className={styles.startButton}>START</button>
      </form>
      <a href="/work-examples" className={styles.workExamplesLink}>Go straight to work examples</a>
    </div>
  );
};

export default HomePage;