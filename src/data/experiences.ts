import type { Experience } from "../types/index";
import babylonHealthLogo from "../assets/babylonhealth.png";
import northcodersLogo from "../assets/northcoders.jpg";

export const experiences: Experience[] = [
  {
    role: "Associate Software Engineer",
    company: "Babylon Health",
    startDate: "Feb 2024",
    endDate: "Present",
    logo: babylonHealthLogo,
    logoBg: "#ffffff",
    description: [
      "Focused on front-end development for clinical, admin, and enterprise portals, using React, Redux, and TypeScript to create user-friendly interfaces.",
      "Developed a secure file upload component for clinical documents, improving operational efficiency.",
      "Worked within an Agile team, collaborating through pair programming, code reviews, and knowledge-sharing sessions.",
      "Utilised CI/CD pipelines with GitHub Actions and CircleCI for production releases, ensuring smooth deployments.",
      "Applied TDD and BDD to maintain high code quality, writing unit and integration tests with Jest.",
      "Used Sentry and Honeycomb for error tracking and system monitoring, ensuring reliability across the portals.",
      "Contributed to back-end tasks involving SQL and NoSQL databases, enhancing data storage solutions.",
      "Played a key role in white-labelling projects, customising portal themes for clients."
    ],
  },
  {
    role: "Trainee Software Developer",
    company: "Northcoders",
    startDate: "Mar 2023",
    endDate: "Jul 2023",
    logo: northcodersLogo,
    logoBg: "#ffffff",
    description: [
      "Completed a 13-week bootcamp, mastering JavaScript, Node.js, and Express through hands-on projects.",
      "Developed full-stack applications, applying agile methodologies, TDD, and pair programming.",
      "Built and deployed APIs, web servers, and CI/CD pipelines using PSQL, Jest, and Git.",
    ],
  },
  {
    role: "Clinical Liaison Associate",
    company: "Babylon Health",
    startDate: "Nov 2018",
    endDate: "Jan 2024",
    logo: babylonHealthLogo,
    logoBg: "#ffffff",
    description: [
      "Managed a portfolio of 110 clients, ensuring contracts were fulfilled and services delivered on time.",
      "Improved gross margins by 90% and reduced consultation costs by 30%.",
      "Presented operational updates to internal and external stakeholders.",
      "Completed JavaScript Essentials to bridge the gap between operations and technical teams."
    ],
  },
];

