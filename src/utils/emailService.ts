import emailjs from 'emailjs-com';

export const initEmailJS = () => {
  emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY!);
};

interface EmailParams {
  [key: string]: any;
  name: string;
  email: string;
  message: string;
}

export const sendEmail = (params: EmailParams) => {
  return emailjs.send(
    process.env.REACT_APP_EMAILJS_SERVICE_ID!,
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
    params
  );
};