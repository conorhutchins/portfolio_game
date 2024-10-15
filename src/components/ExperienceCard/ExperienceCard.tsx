import React from 'react';
import type { Experience } from '../../types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useTheme } from '../../theme/ThemeContext';
import styles from './ExperienceCard.module.css';

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? '#2a2a2a' : 'linear-gradient(135deg, #ddd8d8, #1ac9e0)';
  const textColor = isDarkMode ? '#ffffff' : '#333333';

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: backgroundColor,
        boxShadow: '0 3px 0 #3a3a3a',
        borderRadius: '15px',
        padding: '2rem',
        color: textColor, // This will set the default text color for the content
      }}
      contentArrowStyle={{ borderRight: `10px solid ${backgroundColor}` }}
      date={`${experience.startDate} - ${experience.endDate}`}
      dateClassName={styles.date}
      iconStyle={{
        background: '#fff',
      }}
      iconClassName={styles.icon}
      icon={
        <div className={styles.iconContainer} style={{ background: experience.logoBg }}>
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            className={styles.logo}
          />
        </div>
      }
    >
      <section className={styles.content}>
        <h3 className={styles.role}>{experience.role}</h3>
        <p className={styles.company}>{experience.company}</p>
      </section>

      <ul className={styles.descriptionList}>
        {experience.description.map((desc, index) => (
          <li key={index} className={styles.descriptionItem}>{desc}</li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;