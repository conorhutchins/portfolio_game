import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './ContactPage.module.css';

const ContactPage: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      <h1>Contact</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
