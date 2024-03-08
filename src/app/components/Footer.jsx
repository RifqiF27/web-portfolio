import Image from "next/image";
import Link from "next/link";
import React from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import WhatsappIcon from "../../../public/whatsapp-icon.svg";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="p-12 flex items-center justify-between">
        <span>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="rounded-sm"
          />
        </span>
        <div className="text-center md:text-center">
          <p className="text-slate-600">All rights reserved.</p>
          <p className="text-slate-600">Rifqi Fadluloh &copy; 2024</p>
        </div>
        <div className="socials flex-row gap-2 grid sm:grid-cols-3 ">
          <Link href="https://github.com/RifqiF27">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://www.linkedin.com/in/rifqi-f-19bb6b124/">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
          <Link href="https://api.whatsapp.com/send/?phone=628111827895">
            <Image src={WhatsappIcon} alt="Whatsapp Icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
