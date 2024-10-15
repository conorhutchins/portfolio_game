import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navigation.module.css';
import nameLogoLight from '../../assets/nameLogoLight.png';
import nameLogoDark from '../../assets/nameLogoDark.png';

// Import icons from react-icons
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a navigation item is clicked
  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Left Side: Menu Icon and Logo */}
        <div className={styles.leftContainer}>
          {/* Menu Icon */}
          <div className={styles.menuIcon} onClick={toggleMenu}>
            <span className={styles.menuIconLine}></span>
            <span className={styles.menuIconLine}></span>
            <span className={styles.menuIconLine}></span>
          </div>

          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={handleNavItemClick}>
            <img src={isDarkMode ? nameLogoDark : nameLogoLight} alt="logo" 
            className={styles.logoImg}/>
          </Link>
        </div>

        {/* Social Icons (Centered) */}
        <div className={styles.socialIcons}>
          <a
            href="https://github.com/conorhutchins"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
          >
            <FaGithub className={styles.socialIcon} />
          </a>
          <a
            href="https://www.linkedin.com/in/conorhutchins/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
          >
            <FaLinkedin className={styles.socialIcon} />
          </a>
        </div>

        {/* Theme Toggle (Right Side) */}
        <div className={styles.themeToggle}>
          <ThemeToggle />
        </div>

        {/* Navigation Links (Hidden by Default, Shown on Menu Open) */}
        <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ''}`}>
          <li className={styles.navItem}>
            <Link to="/experience" className={styles.navLink} onClick={handleNavItemClick}>
              Experience
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/projects" className={styles.navLink} onClick={handleNavItemClick}>
              Projects
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink} onClick={handleNavItemClick}>
              Contact
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/techstack" className={styles.navLink} onClick={handleNavItemClick}>
              Tech Stack
            </Link>
          </li>
          <li className={styles.navItem}>
            <a
              href="https://docs.google.com/document/d/1_mCPPCm-o1bl1O-s_qwoy6YYP0L4V-Ty4BldaSQCDis/edit?usp=sharing"
              className={styles.navLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavItemClick}
            >
              C.V
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
