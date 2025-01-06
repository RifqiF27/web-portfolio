"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2 grid grid-cols-2 md:grid-cols-3 items-center">
        <li>Node.js</li>
        <li>GO</li>
        <li>GORM</li>
        <li>Gin.js</li>
        <li>gRPC.js</li>
        <li>JWT</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Sequelize</li>
        <li>GraphQL</li>
        <li>Vue</li>
        <li>React</li>
        <li>React Native</li>
        <li>Next</li>
        <li>AWS</li>
        <li>Docker</li>
        <li>Git</li>
      </ul>
    ),
  },
  {
    title: "education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Lumoshive - Backend Golang</li>
        <li>Hacktiv8 - Full Stack JavaScript Immersive</li>
        <li>Polytechnic State Of Jakarta - Electrical Engineering</li>
      </ul>
    ),
  },
  {
    title: "experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li>PT Suzuki Indomobil Motor - Technical Control</li>
        <li>PT Kaldu Sari Nabati - Maintenance</li>
      </ul>
    ),
  },
  {
    title: "certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <a href="/">
            Lumoshive - Backend Golang
          </a>
        </li>
        <li>
          <a href="https://sertiva.id/credential/1a0b2bc8-ef62-4581-931b-87c5ce2c28ef">
            Hacktiv8 - Fullstack Javascript Immersive
          </a>
        </li>
        <li>
          <a href="https://www.hackerrank.com/certificates/60397741306b">
            HackerRank - Javascript intermediate
          </a>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white my-12 md:my-12" id="about">
      <div className="grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/animated.png"
          alt="animated"
          width={500}
          height={500}
          className="rounded-md"
        />
        <div className="mt-4 md:mt-0 flex flex-col text-left h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          My journey began with a foundation in electrical engineering from Politeknik Negeri Jakarta, which paved the way for my transition into full-stack development. At Hacktiv8 Indonesia and Lumoshive, I honed my skills in Golang and JavaScript, deepening my understanding of front-end and back-end technologies. At PT. Suzuki Indomobil Motor, I sharpened my analytical skills by ensuring production machinery efficiency and training colleagues. Now, I am ready to innovate and deliver impactful solutions in the tech development world.
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 mt-6">
            <TabButton
              tabSelect={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              tabSelect={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              tabSelect={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              Experience
            </TabButton>
            <TabButton
              tabSelect={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-4">
            {TAB_DATA.find((data) => data.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
