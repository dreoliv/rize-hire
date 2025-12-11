export interface Skill {
  name: string;
  score: number;
  description: string;
}

export interface SkillCategory {
  portfolioUrl: string;
  skills: Skill[];
}

export interface SoftSkill {
  score: number;
  description: string;
  details?: string;
  standoutTraits?: string[];
}

export interface Testimonial {
  quote: string;
  instructor: string;
  course: string;
}

export interface PerformanceMetrics {
  avgDaysBeforeDeadline: number;
  attendanceRate: number;
  engagementScore: number;
  messagesPerCourse: number;
  avgResponseTimeHours: number;
  careerMilestoneGrade: number;
  interviewingGrade: number;
}

export interface SoftSkills {
  proactivity: SoftSkill;
  communication: SoftSkill;
  presentationSkills: SoftSkill;
}

export interface HardSkills {
  computerScience?: SkillCategory;
  dataScience?: SkillCategory;
}

export interface InstructorFeedback {
  testimonials: Testimonial[];
  recommendationRate: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  location: string;
  profilePicture: string;
  major: string;
  college: string;
  graduationYear: number;
  matchScore: number;
  performanceMetrics: PerformanceMetrics;
  softSkills: SoftSkills;
  hardSkills: HardSkills;
  instructorFeedback: InstructorFeedback;
  skills: string[];
}

export interface StudentsData {
  students: Student[];
}
