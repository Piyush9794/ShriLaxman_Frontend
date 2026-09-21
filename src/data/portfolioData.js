export const personalInfo = {
  name: "Piyush Vishwakarma",
  role: "Software Developer / Front-End Developer",
  tagline: "Building responsive, modern, and high-performance web applications with React.js, Next.js, and TypeScript.",
  location: "Lucknow, India",
  email: "vishwakarmapiyush327@gmail.com",
  phone: "9794125123",
  formattedPhone: "+91 97941 25123",
  experienceYears: "1.3+",
  availability: "Available for Freelance Opportunity",
  summary:
    "Front-End Developer with 1.3 year of professional experience in modern web development. Quick learner with strong problem-solving skills, adaptable to new technologies, and passionate about building responsive and user-friendly web applications using React.js, Next.js, TypeScript, JavaScript, and the MERN stack.",
  socials: {
    linkedin: "https://linkedin.com/in/piyush-vishwakarma", // Placeholder URL - configure when available
    github: "https://github.com/piyushvishwakarma", // Placeholder URL - configure when available
    email: "mailto:vishwakarmapiyush327@gmail.com",
    phone: "tel:+919794125123",
  },
};

export const navigationLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const experienceData = [
  {
    id: "arivani",
    role: "Software Developer",
    company: "Arivani Technology Private Limited",
    period: "05/2025 – 06/2026",
    duration: "1.3 Year",
    badge: "Current / Latest",
    location: "India",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Context API"],
    responsibilities: [
      "Working on live projects and gaining practical experience in frontend development.",
      "Developing and scaling modern user interfaces using React and Next.js.",
      "Implementing responsive and performant designs with Tailwind CSS.",
      "Writing type-safe and maintainable code using TypeScript.",
      "Managing robust application state architectures using React Context API.",
    ],
  },
  {
    id: "techpile",
    role: "MERN Intern",
    company: "Techpile Technology",
    period: "2025",
    duration: "8 Months",
    badge: "Internship",
    location: "India",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap 5", "Node.js", "Express.js", "MongoDB", "MVC"],
    responsibilities: [
      "Developed responsive web applications using React.js, JavaScript, HTML5, CSS3, and Bootstrap 5.",
      "Built robust RESTful APIs using Node.js, Express.js, and MVC architecture.",
      "Managed application data modeling and persistence using MongoDB.",
      "Wrote clean, maintainable, and efficient code while collaborating closely with the development team.",
    ],
  },
];

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern UI libraries, responsive styling, and fast interactive frameworks",
    skills: [
      { name: "React.js", level: "Primary" },
      { name: "Next.js", level: "Primary" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "Tailwind CSS", level: "Primary" },
      { name: "Bootstrap 5", level: "Experienced" },
      { name: "Material UI", level: "Experienced" },
      { name: "HTML5", level: "Foundation" },
      { name: "CSS3", level: "Foundation" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server-side RESTful API design and MVC architectures",
    skills: [
      { name: "Node.js", level: "Core" },
      { name: "Express.js", level: "Core" },
      { name: "RESTful APIs", level: "Core" },
      { name: "MVC Architecture", level: "Pattern" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational and document databases for persistent web applications",
    skills: [
      { name: "MongoDB", level: "Primary" },
      { name: "MySQL", level: "Experienced" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    description: "Programming and scripting languages",
    skills: [
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "TypeScript", level: "Core" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Ecosystem",
    description: "Development tools, API testing, debugging, and productivity",
    skills: [
      { name: "Git", level: "Version Control" },
      { name: "Postman", level: "API Testing" },
      { name: "Swagger", level: "API Docs" },
      { name: "Browser Debugging", level: "DevTools" },
      { name: "Ngrok", level: "Tunneling" },
      { name: "Bruto", level: "Workflow" },
      { name: "MS Word", level: "Productivity" },
      { name: "MS Excel", level: "Productivity" },
      { name: "PowerPoint", level: "Productivity" },
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    description: "Professional collaborative skills",
    skills: [
      { name: "Communication", level: "Essential" },
      { name: "Teamwork & Collaboration", level: "Essential" },
      { name: "Problem Solving", level: "Strength" },
      { name: "Quick Learner", level: "Strength" },
    ],
  },
];

export const projectsData = [

  {
    id: "unitynivo",
    link: "https://unitynivo.com/",   // ← URL add kiya
    title: "UnityNivo",
    subtitle: "UnityNivo is a platform for employees to celebrate their birthdays with their colleagues.",
    category: "Full Stack / Backend / DevOps",  // ← updated
    description:
      "Built end-to-end — from designing and developing the frontend using React.js and Next.js, to architecting and implementing the backend APIs with Node.js and Express.js. Handled complete deployment and hosting on a live server, ensuring the platform is production-ready, scalable, and performant. Implemented reusable UI components, REST APIs, state management via Context API, and maintained clean, efficient code throughout the project.",
    stack: ["React.js", "Next.js", "Node.js", "Express.js", "Bootstrap", "Context API", "Axios", "REST APIs"],
    metrics: ["Full Stack Development", "Deployed & Hosted", "Scalable Architecture"],
    colorTheme: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderGlow: "group-hover:border-cyan-500/40",
    gradientText: "from-cyan-400 to-blue-500",
  },

  {
    id: "bezzflow",
    title: "Bezzflow",
    subtitle: "Scalable Enterprise Web Application",
    category: "Full Stack / Frontend",
    description:
      "Developed a responsive web application using React.js, Next.js, Bootstrap, Context API, and Axios. Built reusable UI components, integrated REST APIs, managed application state using React Context API, and collaborated with the backend team to deliver scalable, high-performance frontend solutions while maintaining clean, efficient, and maintainable code to enhance the user experience.",
    stack: ["React.js", "Next.js", "Bootstrap", "Context API", "Axios", "REST APIs"],
    metrics: ["Scalable Frontend Architecture", "Reusable Component System", "Optimized API State"],
    colorTheme: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderGlow: "group-hover:border-cyan-500/40",
    gradientText: "from-cyan-400 to-blue-500",
  },

  {
    id: "tour-tracker",
    title: "Tour Tracker",
    subtitle: "Comprehensive Travel & Trip Management Platform",
    category: "Web Application",
    description:
      "Developed a comprehensive tour management website using React.js, MongoDB, HTML, and CSS. Implemented more than 15 key features to streamline trip planning and management. Optimized application performance through efficient coding practices and asynchronous data fetching to enhance the user experience.",
    stack: ["React.js", "MongoDB", "HTML5", "CSS3", "Async Data Fetching", "JavaScript"],
    metrics: ["15+ Key Features", "Async Data Fetching", "Trip Planning Workflow"],
    colorTheme: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "group-hover:border-emerald-500/40",
    gradientText: "from-emerald-400 to-teal-400",
  },
  {
    id: "crud-app",
    title: "Full-Stack CRUD Application",
    subtitle: "End-to-End MERN Data Management System",
    category: "MERN Stack",
    description:
      "Developed full-stack CRUD applications using the MERN Stack: MongoDB, Express.js, React.js, Node.js. Built responsive frontend interfaces, developed RESTful APIs, integrated MongoDB for data management, and connected the frontend with the backend to implement complete end-to-end CRUD functionality.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "RESTful APIs", "MVC"],
    metrics: ["End-to-End CRUD", "RESTful Architecture", "Full-Stack Integration"],
    colorTheme: "from-purple-500/20 via-indigo-500/10 to-transparent",
    borderGlow: "group-hover:border-purple-500/40",
    gradientText: "from-purple-400 to-indigo-400",
  },
];

export const educationData = {
  degree: "Bachelor of Technology in Information Technology",
  institution: "Dr. APJ Abdul Kalam Technical University",
  period: "2020 – 2024",
  grade: "7.86 CGPA",
  location: "Lucknow, India",
  highlights: [
    "Specialized in Information Technology and Computer Science core fundamentals",
    "Strong background in Algorithms, Web Architectures, Database Systems & Software Engineering",
    "Active participant in technical development and coding projects",
  ],
};
