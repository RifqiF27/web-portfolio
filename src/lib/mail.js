// src/lib/mail.js
const nodemailer = require("nodemailer");
const { renderToStaticMarkup } = require("react-dom/server");

const { NEXT_PUBLIC_SMTP_EMAIL, NEXT_PUBLIC_SMTP_PASSWORD } = process.env;
async function sendMail({ from, to = SMTP_EMAIL, name, subject, react }) {

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NEXT_PUBLIC_SMTP_EMAIL,
      pass: NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });
  // console.log(transport, "transport");

  try {
    const testResult = await transport.verify();
    console.log(testResult, "testResult");
  } catch (error) {
    console.error({ error });
    return { success: false, error: "Failed to verify email transport" };
  }

  try {
    const htmlContent = renderToStaticMarkup(react);
    // console.log(from, "FROM");
    // console.log(to, "to")
    const sendResult = await transport.sendMail({
      from: from,
      to: to,
      name: name,
      subject: subject,
      html: htmlContent,
    });
    // console.log(sendResult, "sendResult");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to send email" };
  }
}

module.exports = sendMail;
