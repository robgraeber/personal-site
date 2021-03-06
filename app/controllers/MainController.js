import * as Constants from '../../Constants';
import * as Logger from 'winston2';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(Constants.sendGridAPIKey);

const getEmailBody = req => `
Subject: ${req.body.subject}

Message: ${req.body.message}

--
This mail is sent via contact form on Rob Graeber http://www.robgraeber.com
`;

const emailSendError = {
  status: 'ERROR',
  results: 'An error occurred!'
};

export const getFrontPage = function(req, res) {
  const metaDescription =
    'Rob Graeber is a San Francisco-based software engineer, entrepreneur, and creator of awesome iPhone games like Effing Worms, Stick Blender, and more.';
  res.render('pages/front-page', {
    metaTitle: 'Rob Graeber | Official Website',
    metaDescription
  });
};

export const getAboutPage = function(req, res) {
  res.render('pages/about-page', {
    metaTitle: 'About | Rob Graeber'
  });
};

export const getContactPage = function(req, res) {
  res.render('pages/contact-page', {
    metaTitle: 'Contact | Rob Graeber'
  });
};

export const sendEmail = async function(req, res) {
  Logger.info('Attempting to send mail:');

  if (
    req.body.senderName &&
    req.body.email &&
    req.body.subject &&
    req.body.message
  ) {
    Logger.info('Request valid, sending email');

    try {
      await sgMail.send({
        from: req.body.senderName + ` <${req.body.email}>`,
        to: Constants.contactEmail,
        subject: 'Message from RobGraeber.com',
        text: getEmailBody(req)
      });

      Logger.info('Email sent successfully!');
      res.send({
        status: 'OK',
        results: 'Message sent successfully!'
      });
    } catch (err) {
      Logger.info('Err:', err);
      res.send(emailSendError);
    }
  } else {
    Logger.info('Err: Missing fields -', req.body);
    res.send(emailSendError);
  }
};
