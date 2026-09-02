export interface ProjectFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface CaseStudy {
  architectureOverview: string;
  componentHierarchy: string[];
  stateStrategy: string;
  technicalChallenges: {
    challenge: string;
    solution: string;
  }[];
  outcomes: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  screenshots: string[];
  screenshotTitles?: string[];
  screenshotDescriptions?: string[];
  demoVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  features: ProjectFeature[];
  caseStudy?: CaseStudy;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
  badge?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  result: string;
  duration: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  shortPositioning: string;
  heroSupportingText: string;
  bioHeading: string;
  bioParagraphs: string[];
  location: string;
  availability: string;
  email: string;
  githubUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  avatarUrl?: string;
  suitPhotoUrl?: string;
  education: EducationItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  budget?: string;
}
