export type SiteProfile = {
  id: string;
  first_name: string;
  last_name: string;
  location: string;
  phone: string;
  email: string;
  bio: string;
  tagline: string;
  avatar_url: string;
  updated_at: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
  is_visible: boolean;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  description: string;
  date_label: string;
  sort_order: number;
  is_visible: boolean;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  date_label: string;
  sort_order: number;
  is_visible: boolean;
};

export type Skill = {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  is_visible: boolean;
};

export type WorkflowItem = {
  id: string;
  label: string;
  sort_order: number;
  is_visible: boolean;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  sort_order: number;
  is_visible: boolean;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  technologies: string;
  project_url: string;
  sort_order: number;
  is_visible: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  is_visible: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_visible: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  locale: string;
  is_read: boolean;
  created_at: string;
};

export type PortfolioData = {
  profile: SiteProfile | null;
  socialLinks: SocialLink[];
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  workflowItems: WorkflowItem[];
  certifications: Certification[];
  projects: Project[];
  services: Service[];
  faqs: Faq[];
  contactMessages?: ContactMessage[];
};
