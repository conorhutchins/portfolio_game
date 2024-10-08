import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import QRCode from '../../components/QRCode/QRCode';
import BackButton from '../../components/BackButton/BackButton';
import styles from './ContactPage.module.css';

const ContactPage: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      {/* Custom positioning for the BackButton */}
      <div className={styles.contactBackButton}>
        <BackButton />
      </div>
      <h1 className={styles.title}>Contact Me</h1>
      <ContactForm />
      <QRCode />
    </div>
  );
};

export default ContactPage;
