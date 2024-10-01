import React, { useEffect, useState } from 'react';
import type { Experience } from '../../types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useTheme } from '../../theme/ThemeContext';

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? '#2a2a2a' : '#f0f0f0';
  const textColor = isDarkMode ? '#ffffff' : '#333333';

  return (
    <VerticalTimelineElement
      contentStyle={{ 
        background: backgroundColor, 
        color: textColor, 
        font: "inherit" 
      }}
      contentArrowStyle={{ borderRight: `10px solid ${backgroundColor}` }}
      date={`${experience.startDate} - ${experience.endDate}`}
      iconStyle={{
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        marginLeft: '-30px',
        border: '3px solid black',

      }}
      icon={
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: experience.logoBg,
          borderRadius: '50%',
        }}>
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
            }}
          />
        </div>
      }
    >
      <section>
        <h3 className={`font-comissioner text-3xl font-bold`} style={{ color: textColor }}>
          {experience.role}
        </h3>
        <p className="text-lg font-semibold m-0" style={{ color: isDarkMode ? '#b3b3b3' : '#666666' }}>
          {experience.company}
        </p>
      </section>

      <ul className="list-disc mt-5 ml-5 space-y-2">
        {experience.description.map((desc, index) => (
          <li key={index} className="text-sm pl-1 tracking-wide" style={{ color: textColor }}>
            {desc}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;