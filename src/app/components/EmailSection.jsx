"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Turnstile } from "next-turnstile";
import React, { useState } from "react";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setError("Please complete the captcha.");
      return;
    }
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      turnstileToken,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      setLoading(true);
      const response = await fetch(endpoint, options);
      const resData = await response.json();
      if (response.status === 200) {
        setEmailSubmitted(true);
        setError(null);
      } else {
        setError("Error submitting the form. Please try again later.");
      }
    } catch (error) {
      setError("Error submitting the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div>
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect!
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I am actively exploring new opportunities, and my inbox is always open
          for meaningful conversations. Whether you have a question, want to
          discuss potential collaborations, or just drop a friendly
          &apos;hi,&apos; I&apos;ll make it a priority to respond promptly.
          Looking forward to connecting with you!
        </p>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-white block mb-2 text-sm font-medium"
              >
                Name
              </label>
              <input
                name="name"
                type="name"
                id="name"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter the subject"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={8}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
                required
              />
            </div>
            <div className="mb-6 justify-center flex">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                onSuccess={setTurnstileToken}
                onError={() =>
                  setError("Captcha error. Please reload the page.")
                }
                onExpire={() => setTurnstileToken("")}
                className="cf-turnstile"
                style={{ minHeight: 65 }}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
              disabled={loading}
            >
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  pulse
                  style={{ marginRight: "5px" }}
                />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
