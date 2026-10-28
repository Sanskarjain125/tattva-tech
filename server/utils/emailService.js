import nodemailer from 'nodemailer';

// Helper to get or create transporter
const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

/**
 * Send email notification to company head on new enquiry
 */
export const sendEnquiryNotificationToCompanyHead = async ({ name, email, company, message, submissionDate }) => {
  const recipient = process.env.COMPANY_HEAD_EMAIL || 'head@tattvatech.com';
  const subject = `[New Enquiry] Tattvaa Tech Website - From ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
      <h2 style="color: #2563eb; margin-bottom: 10px;">New Client Enquiry Received</h2>
      <p style="color: #475569; font-size: 14px;">A new prospective client has submitted an inquiry on the Tattvaa Tech website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${company || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Date:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${new Date(submissionDate || Date.now()).toLocaleString()}</td></tr>
      </table>

      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 12px 16px; margin: 20px 0;">
        <h4 style="margin: 0 0 6px 0; color: #1e293b;">Project Message:</h4>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">${message}</p>
      </div>

      <p style="color: #64748b; font-size: 12px; margin-top: 25px;">Log in to the Admin Dashboard to manage and update enquiry status.</p>
    </div>
  `;

  try {
    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"Tattvaa Tech Website" <${process.env.SMTP_USER || 'no-reply@tattvatech.com'}>`,
        to: recipient,
        subject,
        html,
      });
      console.log(`[Email Sent]: Enquiry alert sent to ${recipient}`);
    } else {
      console.log(`[Email Notice (Console Mode)]:`);
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${subject}`);
      console.log(`Client: ${name} (${email}) - Company: ${company || 'N/A'}`);
      console.log(`Message: ${message}`);
    }
  } catch (error) {
    console.warn(`[Email Warning]: Failed to dispatch email notification: ${error.message}. Enquiry is safely stored in MongoDB.`);
  }
};

/**
 * Send email notification to HR on new candidate application
 */
export const sendApplicationNotificationToHR = async ({ applicantName, email, phone, jobTitle, resumeUrl, portfolioUrl, coverLetter }) => {
  const recipient = process.env.HR_EMAIL || 'hr@tattvatech.com';
  const subject = `[New Application] ${jobTitle} - ${applicantName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #2563eb;">New Job Application Received</h2>
      <p style="color: #475569;">A candidate has applied for the position: <strong>${jobTitle}</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr><td style="padding: 6px; font-weight: bold; width: 140px;">Applicant:</td><td>${applicantName}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Phone:</td><td>${phone || 'N/A'}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Portfolio/LinkedIn:</td><td>${portfolioUrl ? `<a href="${portfolioUrl}" target="_blank">${portfolioUrl}</a>` : 'N/A'}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Resume URL:</td><td>${resumeUrl ? `<a href="${resumeUrl}" target="_blank">Download Resume</a>` : 'N/A'}</td></tr>
      </table>

      ${coverLetter ? `
      <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 12px; margin: 15px 0;">
        <h4 style="margin: 0 0 6px 0;">Cover Letter / Note:</h4>
        <p style="margin: 0; color: #334155; font-size: 13px;">${coverLetter}</p>
      </div>` : ''}

      <p style="color: #64748b; font-size: 12px;">Review candidate details in /admin/applications.</p>
    </div>
  `;

  try {
    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"Tattvaa Tech Careers" <${process.env.SMTP_USER || 'no-reply@tattvatech.com'}>`,
        to: recipient,
        subject,
        html,
      });
      console.log(`[Email Sent]: Application alert sent to HR (${recipient})`);
    } else {
      console.log(`[Email Notice (Console Mode)]: Application alert for HR (${recipient}) - Candidate: ${applicantName} for ${jobTitle}`);
    }
  } catch (error) {
    console.warn(`[Email Warning]: Failed to dispatch HR notification: ${error.message}`);
  }
};

/**
 * Send candidate confirmation email
 */
export const sendApplicationConfirmationToCandidate = async ({ applicantName, email, jobTitle }) => {
  const subject = `Application Received: ${jobTitle} at Tattvaa Tech`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #2563eb;">Thank you for applying, ${applicantName}!</h2>
      <p style="color: #334155; font-size: 14px; line-height: 1.6;">
        We have received your application for the <strong>${jobTitle}</strong> position at Tattvaa Tech.
      </p>
      <p style="color: #334155; font-size: 14px; line-height: 1.6;">
        Our engineering and talent team is reviewing your profile and credentials. If there is a match with our current requirements, we will reach out to you within 3 to 5 business days for an initial conversation.
      </p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="color: #64748b; font-size: 12px;">Tattvaa Tech Recruitment Team • Ideas Into Impact</p>
    </div>
  `;

  try {
    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: `"Tattvaa Tech Careers" <${process.env.SMTP_USER || 'careers@tattvatech.com'}>`,
        to: email,
        subject,
        html,
      });
      console.log(`[Email Sent]: Candidate confirmation sent to ${email}`);
    } else {
      console.log(`[Email Notice (Console Mode)]: Candidate confirmation dispatched to ${email}`);
    }
  } catch (error) {
    console.warn(`[Email Warning]: Candidate confirmation email error: ${error.message}`);
  }
};
