import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './ContactPage.module.css';
import QRCode from '../../components/QRCode/QRCode';
import BackButton from '../../components/BackButton/BackButton';

const ContactPage: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      <BackButton />
      <h1>Contact</h1>
      <ContactForm />
      <QRCode />
    </div>
  );
};

export default ContactPage;
