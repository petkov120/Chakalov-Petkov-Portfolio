export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    github: string;
    location?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    technologies?: string[];
  }>;
  projects: Array<{
    name: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
  skills: {
    design: string[];
    development: string[];
    tools: string[];
  };
  education?: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  achievements?: string[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Petkov Richard",
    title: "Lead Product Designer & UX Strategy",
    email: "petkovrichard8@gmail.com",
    github: "github.com/petkov120",
    location: "Remote"
  },
  summary: "Product Designer specializing in AI-powered digital products at the intersection of design, AI, and front-end engineering. Led design teams to deliver award-winning solutions including a ₦10 million hackathon winner. Expert in user-centered design, design systems, and integrating AI tools into intuitive interfaces.",
  experience: [
    {
      title: "Lead Product Designer & UX Strategy",
      company: "Universityx",
      location: "Remote, Nigeria",
      period: "2024 - 2025 (8 months)",
      description: "Led product design for AI-powered educational platform focused on student engagement and retention. Designed gamification solutions and AI integration features that improved learning outcomes.",
      achievements: [
        "Led product design process that won ₦10 million grand prize at Wema Bank's Hackaholics 5.0 competition",
        "Designed AI and gamification solutions that improved student engagement and retention",
        "Reduced lecturer workload while increasing school revenue through improved platform design",
        "Collaborated with 4-person team (Product Designer, Product Manager, 2 developers)",
        "Created comprehensive design system and user experience strategy"
      ],
      technologies: ["Figma", "Design Systems", "AI Integration", "Gamification", "UX Strategy"]
    },
    {
      title: "Lead Product Designer and UX Strategy",
      company: "Openxp",
      location: "Remote",
      period: "2024",
      description: "Led design and development of two versions of exam preparation software. Integrated AI tools to help students make better career and subject choices through personalized learning experiences.",
      achievements: [
        "Led development of two iterative versions of exam prep platform",
        "Placed in top 30 out of 5,000+ applicants at lablab NEXT hackathon",
        "Designed AI-powered tools for personalized learning and career guidance",
        "Created intuitive interfaces for exam preparation across multiple exam types",
        "Improved study organization and progress tracking for students"
      ],
      technologies: ["Figma", "AI Tools", "User Research", "Iterative Design", "Mobile Design"]
    },
    {
      title: "UI Designer, Design System Designer and UX Development",
      company: "TreatmentPath",
      location: "Remote, UK",
      period: "2025 (2 weeks 5 days)",
      description: "Designed healthcare technology platform to streamline patient treatment workflows. Created AI-powered voice-to-text system and smart response templates for dental practice management.",
      achievements: [
        "Reduced administrative overhead by 40% through automated workflows",
        "Designed complete design system with tokens and components",
        "Created AI-powered voice-to-text system for hands-free documentation",
        "Built smart template library with 120+ pre-written patient responses",
        "Increased treatment plan acceptance rates with improved UX",
        "Validated prototypes with real dental staff in production environment"
      ],
      technologies: ["Figma", "Design Systems", "AI Integration", "Voice-to-Text", "Healthcare UX"]
    },
    {
      title: "Product Designer",
      company: "Customer Experience Solutions (B2B)",
      location: "Remote",
      period: "2024",
      description: "Designed comprehensive customer experience solutions for B2B software platforms. Focused on creating intuitive interfaces that enhance user satisfaction and business outcomes.",
      achievements: [
        "Improved customer retention by 40% through data-driven design solutions",
        "Led cross-functional teams to deliver customer experience improvements",
        "Created intuitive interfaces for B2B software platforms",
        "Applied user research and analytics to inform design decisions"
      ],
      technologies: ["Figma", "B2B UX", "Data-Driven Design", "User Research", "Analytics"]
    }
  ],
  projects: [
    {
      name: "MolerHealth",
      role: "Product Designer",
      period: "2024",
      description: "Comprehensive medical dashboard system designed to streamline healthcare practice management with patient analytics, appointment scheduling, and treatment tracking.",
      achievements: [
        "Designed intuitive patient analytics dashboard",
        "Created efficient appointment scheduling system",
        "Implemented real-time data visualization",
        "Streamlined workflow management for healthcare providers"
      ],
      technologies: ["Figma", "Healthcare UX", "Dashboard Design", "Data Visualization"]
    },
    {
      name: "Wikipedia Community Profile",
      role: "UX Designer",
      period: "2023",
      description: "Designed improved version of Wikipedia Community Portal focused on accessibility and cognitive clarity with assistive features for users with dyslexia.",
      achievements: [
        "Implemented text-to-speech functionality",
        "Created distraction-free reading mode",
        "Simplified navigation for better accessibility",
        "Applied inverted pyramid and whitespace management principles",
        "Reduced visual load for users with dyslexia"
      ],
      technologies: ["Figma", "Accessibility Design", "Inclusive Design", "UX Research"]
    }
  ],
  skills: {
    design: [
      "Product Design",
      "UX Strategy",
      "UI Design",
      "Design Systems",
      "User Research",
      "Prototyping",
      "Information Architecture",
      "Interaction Design",
      "Accessibility Design",
      "Inclusive Design"
    ],
    development: [
      "Front-end Engineering",
      "React",
      "TypeScript",
      "HTML/CSS",
      "Responsive Design",
      "Mobile Design"
    ],
    tools: [
      "Figma",
      "Design Systems",
      "AI Integration",
      "Voice-to-Text Systems",
      "Prototyping Tools",
      "User Testing",
      "Analytics"
    ]
  },
  achievements: [
    "Won ₦10 million grand prize at Wema Bank's Hackaholics 5.0 (2024)",
    "Placed in top 30 out of 5,000+ applicants at lablab NEXT hackathon",
    "Improved customer retention by 40% through data-driven design",
    "Reduced administrative overhead by 40% in healthcare platform",
    "Led multiple successful product launches from concept to MVP"
  ]
};

