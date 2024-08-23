import React from 'react';
import type { Experience } from '../../types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "10px solid #232631" }}
      date={`${experience.startDate} - ${experience.endDate}`}
      iconStyle={{
        background: experience.logoBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',  
        height: '60px', 
        marginLeft: '-30px',
      }}
      icon={
        <img
          src={experience.logo}
          alt={`${experience.company} logo`}
          style={{
            width: '40px', // Size of the image inside the icon
            height: '40px',
            objectFit: 'contain',
          }}
        />
      }
    >
      <section>
        <h3 className="font-comissioner text-white text-3xl font-weight 900">{experience.role}</h3>
        <p className="text-secondary text-lg font-semibold m-0">
          {experience.company}
        </p>
      </section>

      <ul className="list-disc mt-5 ml-5 space-y-2">
        {experience.description.map((desc, index) => (
          <li key={index} className="text-gray-300 text-sm pl-1 tracking-wide">
            {desc}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
