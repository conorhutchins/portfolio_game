import SectionWrapper from "../../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../../utils/motionForText";
import styles from "../../styles";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../data/projects";
import { Project } from "../../types/index";
import BackButton from "../../components/BackButton/BackButton";

const Projects: React.FC<{}> = () => {
  return (
    <motion.section
      variants={textVariant()}
      className="relative w-full mx-auto"
    >
      <BackButton />
      <motion.article variants={fadeIn("down", "spring", 0.1, 1)}>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        <motion.p
          className={`${styles.sectionSubText} mt-4 max-w-3xl leading-8`}
        >
          My Work (more projects coming soon).
        </motion.p>
      </motion.article>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {projects.map((proj: Project, index: number) => {
          return <ProjectCard key={proj.name} proj={proj} index={index} />;
        })}
      </div>
    </motion.section>
  );
};

export default Projects;
