import SectionWrapper from "../../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../../utils/motionForText";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../data/projects";
import { Project } from "../../types/index";
import BackButton from "../../components/BackButton/BackButton";
import styles from "./Projects.module.css";

const Projects: React.FC<{}> = () => {
  return (
    <motion.section
      variants={textVariant()}
      className="relative w-full mx-auto"
    >
      <div className={styles.projectsBackButton}><BackButton /> </div>
      <motion.article variants={fadeIn("down", "spring", 0.1, 1)}>
        <h2 className={styles.sectionHeadText}>Projects</h2>
        <motion.p className={styles.sectionSubText}>
          My work (more projects coming soon)
        </motion.p>
      </motion.article>

      <div className={styles.gridContainer}>
        {projects.map((proj: Project, index: number) => {
          return <ProjectCard key={proj.name} proj={proj} index={index} />;
        })}
      </div>
    </motion.section>
  );
};

export default Projects;
