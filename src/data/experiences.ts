// data/experiences.ts

import type { Experience } from "../types/index";
import  babylonHealthLogo  from "../assets/babylonhealth.png";
import  northcodersLogo  from "../assets/northcoders.jpg";

export const experiences: Experience[] = [
  {
    role: "Associate Software Engineer",
    company: "Babylon Health",
    startDate: "February 2024",
    endDate: "Present",
    logo: babylonHealthLogo,
    logoBg: "#ffffff",
    description: [
      "Core Development & Maintenance: Actively developed and maintained a large monolith codebase, integrating new features such as file upload component for clinical documents and updating legacy code. Demonstrated flexibility by working independently on JIRA tickets and pairing with senior engineers when necessary.",
      "Problem Solving & Code Quality: Regularly engaged in bug fixes and assisted in application releases. Independently produced high-quality code as to eMeds engineering guidelines.",
      "Stakeholder Engagement & Presentation: Delivered a live demo to stakeholders of a new epic involving storing and managing patient clinical documents, effectively communicating project progress and impact. Presented in knowledge-sharing sessions on Typescript, to other members of the Clinical Interactions team.",
      "Testing & Reliability: Wrote thorough unit tests, including mocks and performing automated tests and regression tests, to ensure robust and reliable software functionality. Utilised tools like Honeycomb for monitoring logs and traces and Sentry for error management, ensuring high system reliability.",
      "Collaboration & Feedback: Actively involved in peer reviews, providing and receiving critical feedback on pull requests (PRs), which enhanced team collaboration and code quality.",
      "Feature Enhancement & Customisation: Contributed to theming for our web app’s white-labeling project, enabling dynamic CSS modifications based on client configurations. Employed CSS modules for styling, ensuring scalable and maintainable code.",
      "Technical Skills & Tools: Worked extensively with modern web technologies including React, Redux for state management, and CSS modules for component-level styling.",
    ],
  },
  {
    role: "Trainee Software Developer",
    company: "Northcoders",
    startDate: "March 2023",
    endDate: "July 2023",
    logo: northcodersLogo,
    logoBg: "#ffffff",
    description: [
      "Completed the prestigious Northcoders Software Engineering bootcamp, a top-tier 13 week coding bootcamp, as a Junior Developer, developing hands-on project expertise through an extensive curriculum and expert mentorship in Javascript.",
      "Embraced agile methodologies, pair programming daily and collaborative programming team project to foster knowledge sharing and continuous skill improvement.",
      "Developed a strong foundation in Git proficiency, cloud deployment and essential soft skills.",
      "Functional programming, OOP, SOLID principles and pair programming.",
      "Solve problems following TDD method using Jest.",
      "Build web servers and APIs with Express.js and Node.js.",
      "Use PSQL as the data management system.",
      "Test endpoints with supertest and build CI/CD pipeline.",
    ],
  },
  {
    role: "Clinical Liaison Associate",
    company: "Babylon Health",
    startDate: "November 2018",
    endDate: "January 2024",
    logo: babylonHealthLogo,
    logoBg: "#ffffff",
    description: [
      "Managed a cohort of 110 clients, ensuring contracts meet service level agreements set by the Managing Director of UK Operations.",
      "Strong focus on customer success, consistently addressing customer pain points in a timely manner, and providing regular updates and data insights.",
      "Building strong relationships through regular phone communication, presentations, and email to ensure successful negotiation of new and expiring contracts to grow revenue.",
      "Presented to internal and external stakeholders with bi-weekly new customer meetings and daily service level updates to the UK Clinical Operations team.",
      "Key Successes:",
      "Improved gross margin on clinical services by 90%.",
      "Delivered a 30% reduction in consultation costs.",
      "Completed JavaScript Essentials course to bridge the gap between tech teams and operations.",
    ],
  },
];
