import React, { useState, useEffect } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';
import { textVariant, fadeIn } from '../../utils/motionForText';
import { experiences } from '../../data/experiences';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import BackButton from '../../components/BackButton/BackButton';
import { useTheme } from '../../theme/ThemeContext';
import { useMediaQuery } from 'react-responsive';

const ExperienceSection = () => {
  const { isDarkMode } = useTheme();
  const [lineColor, setLineColor] = useState('');

  // Use media query to detect screen size
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    // Access the correct computed value from the body
    const computedLineColor = window
      .getComputedStyle(document.body)
      .getPropertyValue('--timeline-line-color')
      .trim();
    setLineColor(computedLineColor);
  }, [isDarkMode]);

  return (
    <div className={styles.section}>
      <div className={styles.experienceBackButton}>
        <BackButton />
      </div>
      <motion.section variants={textVariant()}>
        <motion.article
          variants={fadeIn('down', 'spring', 0.1, 1)}
          className={styles.article}
        >
          <h2 className={`${styles.sectionHeadText} ${styles.headText}`}>
            Professional Experience
          </h2>
          <motion.p
            className={`${styles.sectionSubText} ${styles.subText} mt-4 max-w-3xl leading-[30px]`}
          >
            Where I have worked.
          </motion.p>
        </motion.article>
        <motion.div
          className={`${styles.timelineContainer} mt-20 flex flex-col`}
        >
          <VerticalTimeline
            lineColor={lineColor}
            layout={isSmallScreen ? '1-column' : '2-columns'}
          >
            {experiences.map((experience) => (
              <ExperienceCard key={experience.company} experience={experience} />
            ))}
          </VerticalTimeline>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ExperienceSection;
