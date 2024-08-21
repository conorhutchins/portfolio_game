import React from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import styles from '../../utils/styles';
import { textVariant, fadeIn } from '../../utils/motionForText';
import { experiences } from '../../data/experiences';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import { ReactNode } from 'react';
import type { Experience } from '../../types';
import experienceStyles from './Experience.module.css';
import BackButton from '../../components/BackButton/BackButton';

const ExperienceSection = () => {
  return (
    <>
      <motion.section variants={textVariant()} className={`${experienceStyles.section} relative w-full mx-auto`}>
       <BackButton />
        <motion.article variants={fadeIn("down", "spring", 0.1, 1)} className={experienceStyles.article}>
          <h2 className={`${styles.sectionHeadText} ${experienceStyles.headText}`}>Professional Experience.</h2>
          <motion.p className={`${styles.sectionSubText} ${experienceStyles.subText} mt-4 max-w-3xl leading-[30px]`}>
            Where I have worked.
          </motion.p>
        </motion.article>
        <motion.div className={`${experienceStyles.timelineContainer} mt-20 flex flex-col`}>
          <VerticalTimeline>
            {experiences.map((experience) => (
              <ExperienceCard key={experience.company} experience={experience} />
            ))}
          </VerticalTimeline>
        </motion.div>
      </motion.section>
    </>
  );
};

export default ExperienceSection;
