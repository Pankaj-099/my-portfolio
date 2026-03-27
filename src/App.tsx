import './styles/global.css';
import CustomCursor         from './components/CustomCursor';
import Navbar               from './components/Navbar';
import HeroSection          from './components/HeroSection';
import AboutSection         from './components/AboutSection';
import SkillsSection        from './components/SkillsSection';
import ProjectsSection      from './components/ProjectsSection';
import ExperienceSection    from './components/ExperienceSection';
import AchievementsSection  from './components/AchievementsSection';
import ContactSection       from './components/ContactSection';
import Footer               from './components/Footer';

export default function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
