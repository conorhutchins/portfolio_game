import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EndSummary.module.css';

const EndSummary: React.FC = () => {
  return (
    <div className={styles.endSummary}>
      <h1>Summary of Consumed Information</h1>
      <ul>
        <li><Link to="/cv">CV</Link></li>
        <li><Link to="/experience">Experience</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/skills">Skills</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <Link to="/" className={styles.homeLink}>Back to Home</Link>
    </div>
  );
};

export default EndSummary;
