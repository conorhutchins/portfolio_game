import React from 'react';
import type { Experience } from '../../types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import experienceCardStyles from './ExperienceCard.module.css';

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <VerticalTimelineElement
      className={experienceCardStyles.verticalTimelineElement}
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={`${experience.startDate} - ${experience.endDate}`}
      iconStyle={{ background: experience.logoBg }}
      icon={
        <figure className={`${experienceCardStyles.iconContainer}`}>
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            className={`${experienceCardStyles.logo}`}
          />
        </figure>
      }
    >
      <section>
        <h3 className={experienceCardStyles.role}>{experience.role}</h3>
        <p className={experienceCardStyles.company}>{experience.company}</p>
      </section>

      <ul className={experienceCardStyles.descriptionList}>
        {experience.description.map((desc, index) => {
          return (
            <li key={index} className={experienceCardStyles.descriptionItem}>
              {desc}
            </li>
          );
        })}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
