// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
// // resend.domains.create({ name: 'gmail.com' })
// // resend.domains.verify('75ae1009-5737-40e9-81e1-86055eb71ff2');
// const fromEmail = process.env.FROM_EMAIL;
// const myEmail = process.env.MY_EMAIL
// export async function POST(req, res) {
//   const { email, subject, message } = await req.json();
//   console.log(email, subject, message);
//   try {
//     const data = await resend.emails.send({
//       from: fromEmail,
//       to: [email, myEmail],
//       subject: subject,
//       react: (
//         <>
//           <h1>{subject}</h1>
//           <p>Thank you for contacting us!</p>
//           <p>New message submitted:</p>
//           <p>{message}</p>
//         </>
//       ),
//     });
//     console.log(data);
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }

// import sendMail from "../../../lib/mail";

// // const myEmail = process.env.MY_EMAIL;

// export async function POST(req, res) {
//   const { email, subject, message } = await req.json();
//   console.log(email, subject, message);

//   try {
//     const data = await sendMail({
//       from: email,
//       to: myEmail,
//       subject: subject,
//       react: (
//         <>
//           <h1>{subject}</h1>
//           <p>Thank you for contacting me!</p>
//           <p>New message submitted:</p>
//           <p>{message}</p>
//         </>
//       ),
//     });
//     console.log(data, "data");
//     // res.status(200).json({ success: true });
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     // res.status(500).json({ error: "Failed to send email" });
//     return NextResponse.json({ error });
//   }
// }

import { NextResponse } from "next/server";
import { Resend } from "resend";
import sendMail from "../../../lib/mail";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const myEmail = process.env.MY_EMAIL;

export async function POST(req, res) {
  try {
    const { name, email, subject, message } = await req.json();
    console.log(name, email, subject, message);

    // Using Resend
    const resendData = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Follow up on ${subject}`,
      react: (
        <>
          <p>
            Dear <b>{name}</b>,
          </p>
          <p>
            I trust this email finds you well. I hope you received my previous
            message expressing my gratitude for considering my profile for the
            job opportunity at your company. As I am genuinely enthusiastic
            about the position, I wanted to follow up and reiterate my interest.
          </p>
          <p>
            I understand that you are likely reviewing numerous applications,
            and I appreciate the time and effort invested in the selection
            process. I remain confident that my skills and experience align
            seamlessly with the requirements of the role, and I am eager to
            contribute to the success of your team.
          </p>
          <p>
            If there are any additional materials or information needed from my
            end to facilitate the review process, please don't hesitate to let
            me know. I am available for an interview at your earliest
            convenience to discuss in more detail how my background aligns with
            the needs of the position.
          </p>
          <p>
            Thank you once again for considering my application. I look forward
            to the possibility of further discussions and the opportunity to
            contribute to your company.
          </p>
          <p>
            Regards,
            <br></br>
            Rifqi Fadluloh
            <br></br>
            08111827895
          </p>
        </>
      ),
    });

    // Using sendMail
    const sendMailData = await sendMail({
      from: email,
      to: myEmail,
      subject: subject,
      react: (
        <>
          <h1>
            <b>New Contact Message</b>
          </h1>
          <table>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Subject</td>
              <td>:</td>
              <td>{subject}</td>
            </tr>
            <tr>
              <td>Message</td>
              <td>:</td>
              <td>
                <div>{message}</div>
              </td>
            </tr>
          </table>
        </>
      ),
    });

    console.log("Resend Data:", resendData);
    console.log("sendMail Data:", sendMailData);

    // You can choose which data to return or combine them as needed
    return NextResponse.json({ resendData, sendMailData });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error });
  }
}
