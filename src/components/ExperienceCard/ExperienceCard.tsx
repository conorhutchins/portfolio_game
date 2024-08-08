import React from 'react';
import type { Experience } from '../../types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={`${experience.startDate} - ${experience.endDate}`}
      iconStyle={{ background: experience.logoBg }}
      icon={
        <figure className="flex justify-center items-center h-full w-full">
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            className="w-[70%] h-[70%] object-contain"
          />
        </figure>
      }
    >
      <section>
        <h3 className="text-white, text-[24px] font-bold">{experience.role}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
          {experience.company}
        </p>
      </section>

      <ul className="list-disc mt-5 ml-5 space-y-2">
        {experience.description.map((desc, index) => {
          return (
            <li key={index} className="text-white-100 text-[14px] pl-1 tracking-wider">
              {desc}
            </li>
          );
        })}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
