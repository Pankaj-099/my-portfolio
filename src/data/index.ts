// ── Types ──────────────────────────────────────────────────

export interface Project {
  id: string; title: string; description: string; longDesc: string;
  techStack: string[]; githubUrl: string; liveUrl?: string;
  featured: boolean; category: string; year: number;
  status: 'completed' | 'in-progress' | 'archived';
  highlights: string[]; color: string;
}
export interface Skill { name: string; level: number; category: string; color: string; }
export interface Experience {
  id: string; role: string; company: string; companyUrl?: string;
  type: string; startDate: string; endDate: string;
  location: string; description: string; achievements: string[]; tech: string[];
}
export interface Achievement {
  id: string; title: string; platform: string; description: string;
  icon: string; link?: string; year: number; type: string; color: string;
}

// ── Data ───────────────────────────────────────────────────

export const PROJECTS: Project[] = [{
  id: 'taskboard',
  title: 'TaskBoard',
  year: 2026,
  status: 'completed',
  category: 'B2B SaaS',
  featured: true,
  color: 'linear-gradient(135deg, #818cf8, #7c3aed)',
  description: 'B2B SaaS Kanban platform for team task management with real-time collaboration.',
  longDesc: 'Organization-based multi-tenant Kanban app with drag-and-drop task management. Features role-based permissions with JWT verification, real-time sync via WebSockets, and Redis caching with graceful fallback. Includes analytics dashboard, audit logging with field-level diffs, and a comments system.',
  techStack: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'WebSockets', 'Clerk'],
  githubUrl: 'https://github.com/Pankaj-099/syncboard',
  liveUrl: 'https://taskboard-frontend-puce.vercel.app',
  highlights: [
    'Real-time sync across all browser tabs via WebSockets',
    'Org-scoped multi-tenancy with granular RBAC (view, create, edit, delete)',
    'Redis caching with automatic invalidation and graceful fallback',
    '28 passing tests with in-memory SQLite and dependency injection overrides',
  ],
},
  {
    id: 'adventure-ai',
    title: 'Adventure AI',
    year: 2025,
    status: 'completed',
    category: 'AI Application',
    featured: true,
    color: 'linear-gradient(135deg, #818cf8, #7c3aed)',
    description: 'AI-powered choose-your-own-adventure game with dynamic branching narratives.',
    longDesc: 'Interactive storytelling app where users pick a theme and AI generates the opening scene plus multiple choices. Each selection branches the story in real time via LLM integration. Stories persist in the database so players can return and resume any adventure.',
    techStack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'PostgreSQL', 'OpenAI API', 'SQLAlchemy'],
    githubUrl: 'https://github.com/Pankaj-099/ai-story-generator',
    liveUrl: 'https://your-live-url.com',
    highlights: [
      'Real-time branching story generation via OpenAI/Groq LLM integration',
      'Persistent story history — resume any adventure from the database',
      'Async FastAPI backend with Pydantic validation and CORS handling',
      'Responsive React + Vite frontend with loading states and UI feedback',
    ],
  },
  {
    id: 'prepwise-ai',
    title: 'PrepWiseAI',
    year: 2025,
    status: 'completed',
    category: 'AI Application',
    featured: true,
    color: 'linear-gradient(135deg, #818cf8, #7c3aed)',
    description: 'AI-powered interview prep platform with role-based questions powered by Gemini 2.0.',
    longDesc: 'MERN stack platform that generates personalized technical and behavioral interview questions tailored to job role and experience level using Google Gemini 2.0. Features AI-generated answer explanations, session tracking, per-question notes, and secure JWT authentication — all persisted in MongoDB.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Google Gemini 2.0', 'JWT', 'Mongoose'],
    githubUrl: 'https://github.com/Pankaj-099/ai-interview-prep',
    liveUrl: 'https://your-live-url.com',
    highlights: [
      'Role and experience-based question generation via Google Gemini 2.0 API',
      'AI-generated concept breakdowns explaining the "why" behind each answer',
      'Session tracking with per-question custom notes and revisit functionality',
      'Secure JWT auth with protected routes and persistent MongoDB storage',
    ],
  },
  {
    id: 'getyourstay',
    title: 'GetYourStay',
    year: 2025,
    status: 'completed',
    category: 'Web Application',
    featured: true,
    color: 'linear-gradient(135deg, #818cf8, #7c3aed)',
    description: 'Full-stack vacation rental platform to explore, book, and list stays worldwide.',
    longDesc: 'Web application for discovering and booking vacation rentals with location-based search. Users can browse listings with images and pricing, host their own properties, and manage bookings — all backed by a Node.js/Express API with MongoDB persistence and Passport.js authentication.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Passport.js'],
    githubUrl: 'https://github.com/Pankaj-099/stay-booking-app',
    liveUrl: 'https://your-live-url.com',
    highlights: [
      'Location-based property search across cities and regions',
      'Dual-role platform — guests can book, hosts can list their properties',
      'Secure authentication and session management via Passport.js',
      'Fully responsive design deployed on Render',
    ],
  },
];

export const SKILLS: Skill[] = [
  // Languages
  { name: 'Java',       level: 92, category: 'Languages', color: '#818cf8' },
  { name: 'Python',     level: 90, category: 'Languages', color: '#22d3ee' },
  { name: 'TypeScript', level: 78, category: 'Languages', color: '#4ade80' },
  { name: 'SQL',        level: 85, category: 'Languages', color: '#a78bfa' },
  // Frontend
  { name: 'React',          level: 93, category: 'Frontend', color: '#22d3ee' },
  { name: 'Tailwind CSS',   level: 86, category: 'Frontend', color: '#e879f9' },
  { name: 'Vite',           level: 62, category: 'Frontend', color: '#4ade80' },

  // Backend
  { name: 'Node.js',   level: 88, category: 'Backend', color: '#4ade80' },
  { name: 'FastAPI',   level: 85, category: 'Backend', color: '#22d3ee' },
  { name: 'REST APIs', level: 95, category: 'Backend', color: '#818cf8' },
  // DevOps
  { name: 'Docker',  level: 62, category: 'DevOps & Cloud', color: '#22d3ee' },
  { name: 'CI',   level: 75, category: 'DevOps & Cloud', color: '#4ade80' },

  // AI/ML
  { name: 'PyTorch',     level: 72, category: 'AI / ML', color: '#f87171' },
  { name: 'scikit-learn',level: 80, category: 'AI / ML', color: '#818cf8' },

  // DB
  { name: 'PostgreSQL', level: 85, category: 'Databases', color: '#22d3ee' },
  { name: 'Redis',      level: 78, category: 'Databases', color: '#f87171' },
  { name: 'MongoDB',    level: 80, category: 'Databases', color: '#4ade80' },
];

export const SKILL_CATEGORIES = ['Languages', 'Frontend', 'Backend', 'DevOps & Cloud', 'AI / ML', 'Databases'];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-4', role: 'Freelance Developer', company: 'Self-employed',
    type: 'Freelance', startDate: 'Mar 2024', endDate: 'May 2025', location: 'Remote',
    description: 'Delivered 3 web projects for small businesses, startups, and NGOs.',
    achievements: [
      'Built e-commerce store generating ₹4L+ revenue in first 3 months',
      'Developed a booking system for a Pune-based clinic',
      '100% client satisfaction rate across all engagements',
    ],
    tech: ['Node.js', 'FastAPI', 'React', 'Tailwind CSS', 'TypeScript'],
  },
];

export const ACHIEVEMENTS: Achievement[] = [

];
