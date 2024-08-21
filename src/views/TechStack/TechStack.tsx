import React from 'react';
import styles from './TechStack.module.css';
import { techSkills } from '../../data/techSkills';
import conorCoding from '../../assets/conorCoding.jpg';
import BackButton from '../../components/BackButton/BackButton';

const TechStack = () => {
  return (
    <section className={styles.techStackSection}>
      <div className={styles.techSkills}>
        <BackButton />
        <h2 className= {styles.title}>My Skills</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.skillGrid}>
            {techSkills.map(skill => (
              <div key={skill.name} className={styles.skillCard}>
                <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className={styles.skillIcon}
                  style={{ filter: `drop-shadow(2px 2px 2px ${skill.colour})` }}
                />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
          <img src={conorCoding} alt="Conor coding" className={styles.conorCoding} />
        </div>
      </div>
    </section>
  );
};

export default TechStack;