// utils/email.js
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mmlabel2024@gmail.com',
    pass: 'qozv szvd racz slim'
  }
});

const sendReminderEmail = (to, eventName, eventDate, username, eventTime,eventLocation ) => {
  const mailOptions = {
    from: 'mmlabel2024@gmail.com',
    to,
    subject: 'Event Reminder',
    text: `Hello ${username}.

           This is a friendly reminder that ${eventName} is happening soon! We're excited to see you there on ${eventDate} at ${eventTime}.  
           
           Event Details:

            Date: ${eventDate}
            Time: ${eventTime}
            Location: ${eventLocation} 

            Can't wait to see you there!

            [MM Label]`
            
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendReminderEmail;
