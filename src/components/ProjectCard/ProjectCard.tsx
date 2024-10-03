import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { Project } from '../../types/index';
import { fadeIn } from '../../utils/motionForText';
import styles from './ProjectCard.module.css';
import { FaGithub } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';

const ProjectCard = ({ proj, index }: { proj: Project; index: number }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.9)}
      className={styles.cardContainer}
    >
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 400,
        }}
        className={styles.card}
      >
        <figure className={styles.imageWrapper}>
          <img
            src={proj.image}
            alt={`${proj.name} visual representation`}
            className={styles.image}
          />
          <div className={styles.links}>
            {proj.repo ? (
              <a
                href={proj.repo}
                className={styles.linkButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <FaGithub size={18} />
              </a>
            ) : (
              <span className={`${styles.linkButton} ${styles.disabledLink}`}>
                <FaGithub size={18} />
              </span>
            )}

            {proj.link ? (
              <a
                href={proj.link}
                className={styles.linkButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
              >
                <BiLinkExternal size={18} />
              </a>
            ) : (
              <span className={`${styles.linkButton} ${styles.disabledLink}`}>
                <BiLinkExternal size={18} />
              </span>
            )}
          </div>
        </figure>
        <article className={styles.content}>
          <h3 className={styles.title}>{proj.name}</h3>
          <p className={styles.techStack}>
            Tech Stack:&nbsp;
            {proj.techStack.map(
              (tech: string, index: number, currA: string[]): React.ReactNode => (
                <span key={tech}>
                  {index === currA.length - 1 ? tech : tech + ", "}
                </span>
              )
            )}
          </p>
        </article>

        {proj.comingSoon && (
          <div className={styles.comingSoonOverlay}>
            <p>Coming Soon</p>
          </div>
        )}
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;
