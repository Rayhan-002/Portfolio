import { tasklensCaseStudy } from './case-studies/tasklens'
import { snipzCaseStudy } from './case-studies/snipz'
import { mealManagementCaseStudy } from './case-studies/meal-management'

export interface CaseStudyStat {
  label: string
  value: string
}

export interface CaseStudySection {
  heading: string
  body: string[]
  bullets?: string[]
}

export interface CaseStudy {
  tagline?: string
  stats?: CaseStudyStat[]
  sections: CaseStudySection[]
}

export interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  tech: string[]
  repos: { label: string; url: string }[]
  live?: string
  featured: boolean
  caseStudy?: CaseStudy
}

export interface SkillGroup {
  languages: string[]
  web: string[]
  mlDl: string[]
  databases: string[]
  tools: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  result: string
  coursework?: string[]
  awards?: string[]
}

export interface Publication {
  title: string
  venue: string
  year: number
  doi: string
  summary: string
}

export interface Personal {
  name: string
  tagline: string
  bio: string
  email: string
  linkedin: string
  github: string
  resume: string
  photo: string
}

export const projects: Project[] = [
  {
    id: 'tasklens',
    title: 'TaskLens',
    subtitle: 'Full-Stack Task Management & Image Annotation Platform',
    description:
      'A production-ready full-stack application featuring JWT authentication, RESTful APIs, Kanban-style task management with drag-and-drop, image upload and polygon annotation, reusable React components, and centralized state management.',
    tech: ['Next.js', 'React', 'TypeScript', 'Django', 'DRF', 'PostgreSQL', 'Tailwind CSS', 'Zustand'],
    repos: [
      { label: 'Frontend', url: 'https://github.com/Rayhan-002/tasklens-frontend' },
      { label: 'Backend', url: 'https://github.com/Rayhan-002/tasklens-backend' },
    ],
    live: 'https://tasklens-frontend.vercel.app/login',
    featured: true,
    caseStudy: tasklensCaseStudy,
  },
  {
    id: 'snipz',
    title: 'Snipz',
    subtitle: 'Chrome Screenshot & Annotation Extension',
    description:
      'A lightweight Chrome extension (Manifest V3) for capturing, editing, and annotating screenshots in-browser. Canvas-based editor with freehand drawing, arrows, cropping, and full undo/redo history. Integrated Chrome scripting and clipboard APIs.',
    tech: ['JavaScript', 'Chrome Extension MV3', 'Canvas API'],
    repos: [{ label: 'Code', url: 'https://github.com/Rayhan-002/snipz' }],
    featured: true,
    caseStudy: snipzCaseStudy,
  },
  {
    id: 'backpackers-home',
    title: 'Backpackers Home',
    subtitle: 'Travel Booking Platform',
    description:
      'Full-stack travel booking platform with RESTful Node.js/Express backend, MongoDB, and Firebase authentication. Users can browse packages, book trips, and manage bookings through a personal dashboard.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    repos: [{ label: 'Code', url: 'https://github.com/Rayhan-002/Backpackers-Home' }],
    featured: false,
  },
  {
    id: 'neural-networks',
    title: 'Neural Network Algorithms',
    subtitle: 'Foundations from Scratch',
    description:
      'Implemented KNN, Single & Multi-layer Perceptron, Kohonen SOMs, and Hopfield Networks from scratch. Applied to the Breast Cancer dataset for classification benchmarking.',
    tech: ['Python', 'LaTeX'],
    repos: [{ label: 'Code', url: 'https://github.com/Rayhan-002' }],
    featured: false,
  },
  {
    id: 'meal-management',
    title: 'Meal Management System',
    description:
      'Java Swing desktop application automating meal tracking, expense calculation, and billing for a student hostel mess. Backed by MySQL with secure admin authentication and automated monthly billing computation.',
    tech: ['Java', 'Java Swing', 'MySQL'],
    repos: [{ label: 'Code', url: 'https://github.com/Rayhan-002/Meal-Management' }],
    featured: false,
    caseStudy: mealManagementCaseStudy,
  },
]

// Single shared filter reused by generateStaticParams, the case-study cross-nav
// panel, and sitemap.ts — keeps "has a case study" from drifting between the three.
export const projectsWithCaseStudy = projects.filter(
  (project): project is Project & { caseStudy: CaseStudy } => project.caseStudy !== undefined
)

export const skills: SkillGroup = {
  languages: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Matlab'],
  web: ['Next.js', 'React', 'Django', 'Node.js', 'Express', 'Tailwind CSS', 'HTML', 'CSS'],
  mlDl: ['PyTorch', 'TensorFlow', 'HuggingFace', 'Keras', 'CNN', 'Transformer', 'U-Net', 'GAN', 'RAG'],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
  tools: ['Git', 'Linux', 'LaTeX', 'Chrome Extensions', 'Android Studio'],
}

export const experiences: Experience[] = [
  {
    company: 'Outlier AI',
    role: 'Independent Contractor — Contributor → Auditor',
    period: 'Nov 2024 – Present',
    location: 'Remote',
    bullets: [
      'Promoted from Contributor to Auditor for consistent task accuracy and performance.',
      'Audited and refined AI-generated responses to ensure factual correctness, clarity, and linguistic precision.',
      'Provided quality feedback to improve data annotation standards and model reliability.',
    ],
  },
  {
    company: "Young Learners' Research Lab, RUET",
    role: 'Research Assistant',
    period: 'May 2024 – Dec 2024',
    location: 'Rajshahi, Bangladesh',
    bullets: [
      'Contributed to research activities involving data analysis, experiment setup, and literature review.',
      'Collaborated with faculty and student researchers to ensure methodological consistency and data integrity.',
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science and Engineering (CSE)',
    institution: 'Rajshahi University of Engineering & Technology',
    location: 'Rajshahi, Bangladesh',
    period: '2019 – 2024',
    result: 'CGPA 3.11 / 4.00',
    coursework: [
      'Applied Statistics & Queuing Theory',
      'Neural Networks & Fuzzy Systems',
      'Data Mining',
      'Artificial Intelligence',
      'Digital Image Processing',
      'Database Systems',
      'Parallel and Distributed Processing',
      'Data Structures',
      'Object-Oriented Programming',
      'Computer Algorithms',
      'Computer Networks',
      'Network Security',
    ],
    awards: ['Dutch-Bangla Bank Scholarship', 'RUET Technical Scholarship'],
  },
  {
    degree: 'Higher Secondary Certificate (H.S.C), Science',
    institution: 'New Govt. Degree College',
    location: 'Rajshahi, Bangladesh',
    period: '2016 – 2018',
    result: 'GPA 5.00 / 5.00',
  },
  {
    degree: 'Secondary School Certificate (S.S.C), Science',
    institution: 'Shafikpur High School',
    location: 'Naogaon, Bangladesh',
    period: '2016',
    result: 'GPA 5.00 / 5.00',
  },
]

export const publication: Publication = {
  title:
    'A Hybrid 3D-2D Convolutional Neural Network with Spatial Attention for Enhanced Spectral-Spatial Classification of Hyperspectral Images',
  venue: 'ICCIT 2024',
  year: 2024,
  doi: '10.1109/ICCIT64611.2024.11022565',
  summary:
    'Designed a hybrid 3D-2D CNN architecture with a spatial attention mechanism for hyperspectral image (HSI) classification, using Z-score normalization and Incremental PCA for efficient dimensionality reduction and enhanced spectral-spatial feature extraction.',
}

export const personal: Personal = {
  name: 'Md Rayhan Ali',
  tagline: 'Full-Stack Developer & ML Researcher',
  bio: 'CSE graduate from RUET with a published research paper in hyperspectral image classification. I build production-ready full-stack applications and explore the frontiers of machine learning — combining engineering precision with a research mindset.',
  email: 'sm.rayhanali.bd@gmail.com',
  linkedin: 'https://www.linkedin.com/in/md-rayhan-ali-391215180/',
  github: 'https://github.com/Rayhan-002',
  resume: '/Rayhan_cv.pdf',
  photo: '/Rayhan_image.jpg',
}
