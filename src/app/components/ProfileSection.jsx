"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const ProfileSection = () => {
  const [textColor, setTextColor] = useState("white");
  const [cvUrl, setCVUrl] = useState("");

  useEffect(() => {
    const fetchCVUrl = async () => {
      const response = await fetch(
        "https://drive.google.com/file/d/1CA8NYxbgxPev7xDBIB7xi1lrkoK0FnUg/view?usp=sharing"
      );
      const url = response.url;
      setCVUrl(url);
    };

    fetchCVUrl();
  }, []);

  const handleDownloadCV = () => {
    if (cvUrl) {
      if (cvUrl) {
        window.open(cvUrl, "_blank");
      }
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-4xl lg:text-5xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I'm{" "}
            </span>{" "}
            <br />
            <button
              onClick={() => {
                const items = [
                  "blue",
                  "green",
                  "purple",
                  "pink",
                  "brown",
                  "darkmagenta",
                  "darksalmon",
                  "dodgerblue",
                  "firebrick",
                  "darkviolet",
                  "gold",
                  "limegreen",
                  "indigo",
                  "salmon",
                  "seagreen",
                  "slateblue",
                  "chocolate",
                  "mediumorchid",
                  "darkcyan",
                  "tomato",
                ];
                setTextColor(items[Math.floor(Math.random() * items.length)]);
              }}
            >
              <div
                className="mt-3"
                style={{
                  color: textColor,
                }}
              >
                <TypeAnimation
                  sequence={[
                    () => setTextColor("orange"),
                    "Rifqi",
                    1500,
                    () => setTextColor("tomato"),
                    "Web Developer",
                    1500,
                    () => setTextColor("gold"),
                    "Mobile Developer",
                    1500,
                    () => setTextColor("salmon"),
                    "Fullstack Developer",
                    1500,
                    "",
                  ]}
                  wrapper="span"
                  speed={40}
                  deletionSpeed={90}
                  style={{ fontSize: "1.5em", display: "inline-block" }}
                  repeat={Infinity}
                />
              </div>
            </button>
          </h1>
          <p className="text-[#898e91bd] text-base sm:text-lg mb-6 lg:text-xl text-justify">
            <TypeAnimation
              splitter={(str) => str.split(/(?= )/)}
              cursor={false}
              sequence={[
                "As a dedicated web developer and designer, I thrive on the synergy of code, design, and technology to craft visually stunning and highly functional digital experiences. My ultimate goal is to evolve into a proficient full-stack web developer, adept at seamlessly integrating front-end and back-end technologies. With a keen eye for aesthetics and a love for innovative solutions, I am dedicated to creating websites that not only look appealing but also deliver a seamless user experience. Through my journey, I am constantly pushing boundaries and embracing new challenges in the dynamic world of web development.",
                3000,
              ]}
              speed={{ type: "keyStrokeDelayInMs", value: 150 }}
              omitDeletionAnimation={true}
              style={{ fontSize: "1em", display: "block", minHeight: "200px" }}
              repeat={0}
            />
          </p>
          <div>
            <button className="px-6 py-3 w-full sm:w-fit rounded-xl mr-4 bg-gradient-to-br from-[#3cf2ff] via-[#1b78fb] to-[#00335a] hover:bg-slate-200 text-white">
              <Link href={"#contact"}>Hire Me</Link>
            </button>
            <button
              className="px-1 py-1 w-full sm:w-fit rounded-xl bg-gradient-to-br from-[#00335a] via-[#1b78fb] to-[#3cf2ff] text-white mt-3"
              onClick={handleDownloadCV}
            >
              <span className="block bg-[#121212] rounded-full hover:bg-slate-600 px-6 py-2">
                Download CV
              </span>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] relative">
            <Image
              src="/images/profile-image.png"
              alt="profile image"
              className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;
