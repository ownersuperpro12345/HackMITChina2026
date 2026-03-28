import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";

import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import SubjectsPreview from "./components/SubjectsPreview";
import ProgressionPreview from "./components/ProgressionPreview";
import HomeCTA from "./components/HomeCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SubjectsPreview />
        <ProgressionPreview />
        <HomeCTA />
      </main>
    </div>
  );
}
