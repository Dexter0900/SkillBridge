import { User, UserRole } from '../context/AuthContext';

// Gig Types
export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  duration: string;
  category: string;
  skills: string[];
  employer: User;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  applicants?: User[];
  createdAt: Date;
  deadline?: Date;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  skills: string[];
  link?: string;
  student: User;
  createdAt: Date;
}

// Message Types
export interface Message {
  id: string;
  sender: User;
  recipient: User;
  content: string;
  timestamp: Date;
  read: boolean;
}

// Conversation Types
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

// Review Types
export interface Review {
  id: string;
  reviewer: User;
  reviewee: User;
  rating: number;
  comment: string;
  gig?: Gig;
  createdAt: Date;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Computer Science student with a passion for web development',
    skills: ['React', 'JavaScript', 'Node.js', 'UI/UX Design'],
    location: 'New York, USA',
    website: 'https://johnstudent.com',
    joinedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jane Employer',
    email: 'employer@example.com',
    role: 'employer',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Tech startup founder looking for talented students',
    location: 'San Francisco, USA',
    website: 'https://techstartup.com',
    joinedAt: new Date('2022-11-05')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    joinedAt: new Date('2022-01-01')
  },
  {
    id: '4',
    name: 'Sarah Student',
    email: 'sarah@example.com',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Design student specializing in UI/UX and brand identity',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Illustrator'],
    location: 'London, UK',
    joinedAt: new Date('2023-02-20')
  },
  {
    id: '5',
    name: 'Michael Employer',
    email: 'michael@example.com',
    role: 'employer',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Marketing agency director seeking creative talent',
    location: 'Chicago, USA',
    website: 'https://marketingpros.com',
    joinedAt: new Date('2022-10-15')
  }
];

// Mock Gigs
export const gigs: Gig[] = [
  {
    id: '1',
    title: 'Develop a React Landing Page',
    description: 'We need a modern, responsive landing page built with React and styled with Tailwind CSS. The page should include a hero section, features, testimonials, and a contact form.',
    budget: 500,
    duration: '2 weeks',
    category: 'Web Development',
    skills: ['React', 'Tailwind CSS', 'Responsive Design'],
    employer: users.find(u => u.id === '2')!,
    status: 'open',
    applicants: [users.find(u => u.id === '1')!, users.find(u => u.id === '4')!],
    createdAt: new Date('2023-06-10'),
    deadline: new Date('2023-07-10')
  },
  {
    id: '2',
    title: 'Design a Mobile App UI',
    description: 'Looking for a talented UI/UX designer to create a modern interface for our fitness tracking mobile app. Need wireframes, mockups, and a prototype in Figma.',
    budget: 800,
    duration: '3 weeks',
    category: 'UI/UX Design',
    skills: ['UI/UX Design', 'Figma', 'Mobile Design'],
    employer: users.find(u => u.id === '5')!,
    status: 'open',
    createdAt: new Date('2023-06-15'),
    deadline: new Date('2023-07-15')
  },
  {
    id: '3',
    title: 'Develop a Node.js API',
    description: 'We need a RESTful API built with Node.js and Express for our e-commerce platform. The API should handle user authentication, product management, and orders.',
    budget: 1200,
    duration: '4 weeks',
    category: 'Backend Development',
    skills: ['Node.js', 'Express', 'MongoDB', 'API Design'],
    employer: users.find(u => u.id === '2')!,
    status: 'in-progress',
    applicants: [users.find(u => u.id === '1')!],
    createdAt: new Date('2023-05-20'),
    deadline: new Date('2023-06-20')
  },
  {
    id: '4',
    title: 'Create Social Media Graphics',
    description: 'Need a series of eye-catching graphics for our social media campaigns. Looking for someone with a strong sense of design and knowledge of current trends.',
    budget: 300,
    duration: '1 week',
    category: 'Graphic Design',
    skills: ['Graphic Design', 'Illustrator', 'Social Media'],
    employer: users.find(u => u.id === '5')!,
    status: 'open',
    createdAt: new Date('2023-06-18'),
    deadline: new Date('2023-07-02')
  },
  {
    id: '5',
    title: 'Build a WordPress Website',
    description: 'Looking for someone to build a professional WordPress website for our consulting business. Should include custom theme development and several specific plugins.',
    budget: 900,
    duration: '3 weeks',
    category: 'Web Development',
    skills: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    employer: users.find(u => u.id === '2')!,
    status: 'open',
    createdAt: new Date('2023-06-05'),
    deadline: new Date('2023-07-05')
  },
  {
    id: '6',
    title: 'Content Writing for Blog',
    description: 'We need a skilled writer to create 10 blog posts about technology trends. Each post should be 1000-1500 words and SEO optimized.',
    budget: 500,
    duration: '2 weeks',
    category: 'Content Writing',
    skills: ['Content Writing', 'SEO', 'Research'],
    employer: users.find(u => u.id === '5')!,
    status: 'completed',
    createdAt: new Date('2023-05-01'),
    deadline: new Date('2023-05-15')
  }
];

// Mock Projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website',
    description: 'A full-featured e-commerce platform built with React and Node.js',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://github.com/johndoe/ecommerce',
    student: users.find(u => u.id === '1')!,
    createdAt: new Date('2023-04-15')
  },
  {
    id: '2',
    title: 'Fitness App UI Design',
    description: 'A modern UI design for a fitness tracking mobile application',
    imageUrl: 'https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
    skills: ['UI/UX Design', 'Figma', 'Mobile Design'],
    link: 'https://www.behance.net/sarahdesigner',
    student: users.find(u => u.id === '4')!,
    createdAt: new Date('2023-03-20')
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current and forecasted weather data',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80',
    skills: ['JavaScript', 'API Integration', 'CSS'],
    link: 'https://github.com/johndoe/weather-app',
    student: users.find(u => u.id === '1')!,
    createdAt: new Date('2023-02-10')
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: '1',
    sender: users.find(u => u.id === '2')!,
    recipient: users.find(u => u.id === '1')!,
    content: 'Hi John, I saw your application for the React Landing Page project. When would you be available for a quick chat?',
    timestamp: new Date('2023-06-12T10:30:00'),
    read: true
  },
  {
    id: '2',
    sender: users.find(u => u.id === '1')!,
    recipient: users.find(u => u.id === '2')!,
    content: 'Hello Jane, I would be available tomorrow between 2-5pm EST. Would that work for you?',
    timestamp: new Date('2023-06-12T11:45:00'),
    read: true
  },
  {
    id: '3',
    sender: users.find(u => u.id === '2')!,
    recipient: users.find(u => u.id === '1')!,
    content: 'Perfect! Let\'s talk at 3pm EST. I\'ll send you a meeting link shortly.',
    timestamp: new Date('2023-06-12T13:15:00'),
    read: false
  },
  {
    id: '4',
    sender: users.find(u => u.id === '5')!,
    recipient: users.find(u => u.id === '4')!,
    content: 'Hi Sarah, I\'m interested in your portfolio. Do you have experience with app design?',
    timestamp: new Date('2023-06-11T09:20:00'),
    read: true
  },
  {
    id: '5',
    sender: users.find(u => u.id === '4')!,
    recipient: users.find(u => u.id === '5')!,
    content: 'Hello Michael, yes I do! I\'ve worked on several app design projects. I\'d be happy to share some examples with you.',
    timestamp: new Date('2023-06-11T10:05:00'),
    read: true
  }
];

// Mock Conversations
export const conversations: Conversation[] = [
  {
    id: '1',
    participants: [users.find(u => u.id === '1')!, users.find(u => u.id === '2')!],
    lastMessage: messages.find(m => m.id === '3')!,
    unreadCount: 1
  },
  {
    id: '2',
    participants: [users.find(u => u.id === '4')!, users.find(u => u.id === '5')!],
    lastMessage: messages.find(m => m.id === '5')!,
    unreadCount: 0
  }
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: '1',
    reviewer: users.find(u => u.id === '2')!,
    reviewee: users.find(u => u.id === '1')!,
    rating: 5,
    comment: 'John did an excellent job on our Node.js API project. He delivered on time and the code quality was outstanding.',
    gig: gigs.find(g => g.id === '3')!,
    createdAt: new Date('2023-06-25')
  },
  {
    id: '2',
    reviewer: users.find(u => u.id === '5')!,
    reviewee: users.find(u => u.id === '4')!,
    rating: 4,
    comment: 'Sarah created beautiful designs for our social media campaign. Very creative and responsive to feedback.',
    gig: gigs.find(g => g.id === '6')!,
    createdAt: new Date('2023-05-20')
  }
];

// Mock Testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Computer Science Student',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'SkillBridge helped me find my first freelance gig while still in college. The platform is easy to use and I was able to build my portfolio quickly.',
    rating: 5
  },
  {
    id: '2',
    name: 'Emily Chen',
    role: 'Graphic Design Student',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: "As a design student, finding real-world projects was challenging until I discovered SkillBridge. Now I have a steady stream of work that's helping me grow professionally.",
    rating: 5
  },
  {
    id: '3',
    name: 'Robert Miller',
    role: 'Startup Founder',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    content: "SkillBridge has been a game-changer for our startup. We've found talented students who bring fresh perspectives and quality work at affordable rates.",
    rating: 4
  }
];

// Categories
export const categories = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'Digital Marketing',
  'Data Analysis',
  'Video Editing',
  'Music & Audio',
  'Backend Development'
];

// Skills
export const skills = [
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'UI/UX Design',
  'Figma',
  'Adobe XD',
  'Illustrator',
  'Photoshop',
  'Content Writing',
  'SEO',
  'Social Media Marketing',
  'Data Analysis',
  'MongoDB',
  'SQL',
  'Express',
  'Vue.js',
  'Angular',
  'PHP',
  'WordPress',
  'Mobile Design',
  'Swift',
  'Kotlin',
  'Flutter',
  'React Native'
];