import { Metadata } from "next";
import ProfileSection from "./components/ProfileSection";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import ProjectSection from "./components/ProjectSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";

export const metadata: Metadata = {
  title: "Portfolio - Rifqi Fadluloh",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto py-4 px-12">
        <ProfileSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
