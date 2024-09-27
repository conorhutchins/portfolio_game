import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { sendEmail } from '../../utils/emailService';
import styles from './ContactForm.module.css'; // Import the CSS module

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please provide your name'),
    email: Yup.string().email('Invalid email address').required('I need your email address'),
    message: Yup.string().required('Please go ahead and write a message'),
  });

  const handleSubmit = async (
    values: ContactFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    try {
      const response = await sendEmail(values);
      console.log('SUCCESS!', response.status, response.text);
      setFeedbackMessage('Message sent successfully!');
      resetForm();
    } catch (error) {
      console.log('FAILED...', error);
      setFeedbackMessage('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {feedbackMessage && (
        <div className={feedbackMessage.includes('successfully') ? styles.success : styles.error}>
          {feedbackMessage}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <Field name="name" type="text" placeholder="Enter your name here." className={styles.input} />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <Field name="email" type="email" placeholder="Enter your email address here." className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <Field name="message" as="textarea" placeholder="Enter your message here." className={styles.textarea} />
              <ErrorMessage name="message" component="div" className={styles.error} />
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.button}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
