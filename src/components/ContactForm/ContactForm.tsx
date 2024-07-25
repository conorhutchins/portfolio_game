import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { sendEmail } from '../../utils/emailService';

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
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
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
        <div className={feedbackMessage.includes('successfully') ? 'success' : 'error'}>
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
            <div>
              <Field name="name" type="text" placeholder="Enter your name here." />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <Field name="email" type="email" placeholder="Enter your email address here." />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <Field name="message" as="textarea" placeholder="Enter your message here." />
              <ErrorMessage name="message" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;