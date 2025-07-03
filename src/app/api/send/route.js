import { NextResponse } from "next/server";
import { Resend } from "resend";
import sendMail from "../../../lib/mail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL;
const myEmail = process.env.NEXT_PUBLIC_MY_EMAIL;

export async function POST(req, res) {
  try {
    const { name, email, subject, message, turnstileToken } = await req.json();
    // console.log(name, email, subject, message);

     // Validasi Turnstile
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${turnstileSecret}&response=${turnstileToken}`,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ error: "Turnstile verification failed" }, { status: 400 });
    }

    // Using Resend
    const resendData = await resend.emails.send({
      from: fromEmail,
      to: [email],
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
            end to facilitate the review process, please don&apos;t hesitate to let
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
      to: [myEmail],
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
