import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  content: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
