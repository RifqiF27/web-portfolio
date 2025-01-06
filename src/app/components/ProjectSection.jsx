"use client";

import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

export const projectsData = [
  {
    id: 1,
    title: "Levi's Cloning",
    description:
      "Cloning Levi's website with React.js. There are 3 websites in total. First one is for customer/user, second is for the admin, and the third one is a mobile app.",
    tag: ["All", "Mobile"],
    image: "/images/projects/levis.png",
    gitUrl: "https://github.com/RifqiF27/client-mobile-app-cloning-levis",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Rent Room",
    description:
      "A room rental web app simplifies finding, booking, and managing rooms. Users create profiles, browse listings with detailed room info, photos, and amenities, using smart filters to refine searches.",
    tag: ["All", "Web"],
    image: "/images/projects/rentRoom.png",
    gitUrl: "https://github.com/RifqiF27/RentRoom",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Web Portfolio",
    description:
      "A personal web portfolio showcasing my skills, projects, and achievements. This interactive and visually appealing portfolio provides a glimpse into my technical expertise, creativity, and dedication.",
    tag: ["All", "Web"],
    image: "/images/projects/portfolio.png",
    gitUrl: "https://github.com/RifqiF27/web-portfolio",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "POS App",
    description:
      "Developed APIs for a POS application using Golang and the Gin framework, covering authentication, staff management, menu handling, reservations, revenue reporting, and notifications. Utilized PostgreSQL with GORM, Redis, JWT tokens, Zap logger, CRUD operations, data export, pagination, CDN integration, and Swagger UI.",
    tag: ["All", "Web"],
    image: "/images/projects/POS.png",
    gitUrl: "https://github.com/paulus-otto-harman/project-POS-APP-golang-team1",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Microservices Chat System",
    description:
      "Built a real-time chat app using Golang with microservices architecture. Features include user registration via OTP, real-time messaging with WebSocket, availability tracking, and chat history. Used PostgreSQL, Redis, gRPC for communication, API Gateway for routing, and Docker for deployment.",
    tag: ["All", "Web"],
    image: "/images/projects/chat-app.png",
    gitUrl: "https://github.com/Nameless-ID/project-Chat-APP-golang-team2",
    previewUrl: "/",
  },
];

const ProjectSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-4 md:mb-8">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul
        ref={ref}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12"
      >
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.5, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectSection;
