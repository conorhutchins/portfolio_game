import React from 'react';
import styles from './Modal.module.css';
import { useTheme } from '../../theme/ThemeContext';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${styles.modalOverlay} ${isDarkMode ? styles.dark : styles.light}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.buttonContainer}>
          <button className={styles.cvButton} onClick={onConfirm}>
            Click to view my C.V
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
