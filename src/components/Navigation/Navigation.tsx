import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navigation.module.css';
import nameLogoLight from '../../assets/nameLogoLight.png';
import nameLogoDark from '../../assets/nameLogoDark.png';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Hamburger Icon for Mobile Menu */}
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <span className={styles.menuIconLine}></span>
          <span className={styles.menuIconLine}></span>
          <span className={styles.menuIconLine}></span>
        </div>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          {/* Ensure the correct logo is displayed based on the theme */}
          <img src={isDarkMode ? nameLogoDark : nameLogoLight} alt="logo" />
        </Link>

        {/* Navigation Links */}
        <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ''}`}>
          <li className={styles.navItem}><Link to="/experience" className={styles.navLink}>Experience</Link></li>
          <li className={styles.navItem}><Link to="/projects" className={styles.navLink}>Projects</Link></li>
          <li className={styles.navItem}><Link to="/contact" className={styles.navLink}>Contact</Link></li>
          <li className={styles.navItem}><Link to="/techstack" className={styles.navLink}>Tech Stack</Link></li>
          <li className={styles.navItem}><Link to="/cv" className={styles.navLink}>C.V</Link></li>
        </ul>

        {/* Theme Toggle */}
        <div className={styles.themeToggle}>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
