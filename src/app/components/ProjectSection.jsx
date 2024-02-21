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
      "Cloning Levi’s website with React.js. There are 3 websites in total. First one is for customer/user, second is for the admin, and the third one is a mobile app.",
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
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
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
