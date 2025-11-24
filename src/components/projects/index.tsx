import { ProjectCard } from './ProjectCard';
import imgCreateTreatmentPlans1 from "figma:asset/23a18e1b36e71291ecc500711318a906c582dbc2.png";
import imgPta1 from "figma:asset/3b9ef818ebbe3856fb9217a87724459cdaf11b3b.png";
import imgImage17 from "figma:asset/6f31396b79f9b52ec91036453081ba53c48657af.png";
import imgImage19 from "figma:asset/2c69f2a3a0a3856b9073212a8575a6bc2d5d73d3.png";
// CRITICAL: MolerHealth Dashboard Image - DO NOT REMOVE OR MODIFY
import imgMolerHealthDashboard from "figma:asset/5025ca67f7b26dbaee82a29b4768defa630a62ab.png";
import imgWikipediaCommunity from "figma:asset/984df121712d5b613fcd794b93bdb08ede8b0769.png";

export function TreatmentPathProject({ onViewCaseStudy }: { onViewCaseStudy: () => void }) {
  return (
    <ProjectCard
      title="TreatmentPath"
      category="Healthtech"
      year="2025"
      description="TreatmentPath is a healthcare technology platform designed to streamline patient treatment workflows. The aim was to make an easy-to-use system for healthcare providers to manage treatment plans effectively. With AI tools like voice-to-text and smart response templates, medical professionals can easily make better decisions about patient care and treatment options while reducing administrative overhead."
      imageSrc={imgCreateTreatmentPlans1}
      backgroundColor="#ac83f3"
      onViewCaseStudy={onViewCaseStudy}
      dataSection="treatmentpath"
    />
  );
}

export function UniversityxProject({ onViewCaseStudy }: { onViewCaseStudy: () => void }) {
  return (
    <ProjectCard
      title="Universityx"
      category="Edtech"
      year="2024-2025"
      description="Created AI and gamification solutions to improve student engagement and retention. This helps students learn more effectively, reduces the workload for lecturers, and increases revenue for schools. Led the product design process that won ₦10 million at Wema Bank's Hackaholics 5.0."
      imageSrc={imgPta1}
      backgroundColor="#9d2d9d"
      onViewCaseStudy={onViewCaseStudy}
      dataSection="universityx"
    />
  );
}

export function OpenxpProject({ onViewCaseStudy }: { onViewCaseStudy: () => void }) {
  return (
    <ProjectCard
      title="Openxp"
      category="Edtech"
      year="2024"
      description="Openxp is an exam prep software designed to help you get ready for those big career-defining tests. The aim was to create an easy-to-use app for exam preparation. With AI tools, students can easily make better choices about their careers and subjects. I even led the development of two versions of this app!"
      imageSrc={imgImage17}
      backgroundColor="#281266"
      onViewCaseStudy={onViewCaseStudy}
      dataSection="openxp"
    />
  );
}

// CRITICAL: MolerHealth Project - DO NOT REMOVE OR MODIFY THE IMAGE REFERENCE
export function MolerHealthProject() {
  return (
    <ProjectCard
      title="MolerHealth"
      category="Healthtech"
      year="2024"
      description="MolerHealth is a comprehensive medical dashboard system designed to streamline healthcare practice management. The platform provides doctors with intuitive patient analytics, appointment scheduling, and treatment tracking tools. With real-time data visualization and efficient workflow management, healthcare providers can focus more on patient care while maintaining complete oversight of their practice operations."
      imageSrc={imgMolerHealthDashboard}
      backgroundColor="#10b981"
      dataSection="molerhealth"
      showUnderConstruction={true}
    />
  );
}

export function CustomerExperienceProject() {
  return (
    <ProjectCard
      title="Customer Experience Solutions"
      category="B2B Customer Software"
      year="2024"
      description="Designed comprehensive customer experience solutions for B2B software platforms. Focused on creating intuitive interfaces that enhance user satisfaction and business outcomes. Led cross-functional teams to deliver data-driven design solutions that improved customer retention by 40%."
      imageSrc={imgImage19}
      backgroundColor="#0d6efd"
      dataSection="customer-experience"
      showUnderConstruction={true}
    />
  );
}

export function WikipediaProject() {
  return (
    <ProjectCard
      title="Wikipedia Community Profile"
      category="Community Platform"
      year="2023"
      description="Designed an improved version of the Wikipedia Community Portal focused on accessibility and cognitive clarity. Created prototypes with assistive features like text-to-speech, a distraction-free reading mode, and simplified navigation. Applied principles such as the inverted pyramid, whitespace management, and reduced visual load for users with dyslexia."
      imageSrc={imgWikipediaCommunity}
      backgroundColor="#0645AD"
      dataSection="wikipedia"
      showUnderConstruction={true}
    />
  );
}


