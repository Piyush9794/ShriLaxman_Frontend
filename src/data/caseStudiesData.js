export const caseStudiesData = [
  {
    id: "tap-review-ai",
    title: "TapReview AI – AI-Powered NFC & QR Google Review SaaS",
    subtitle: "Turning happy in-store customers into 5-star Google reviews in 1 tap",
    client: "Multi-Tenant SaaS / Retail & Hospitality Businesses",
    role: "Full-Stack Engineer & System Architect",
    timeline: "2026",
    liveUrl: "https://tap-review-ai-clent.vercel.app/",
    challenge:
      "Physical retail businesses, restaurants, and medical clinics struggle to collect authentic Google Reviews at the point of sale. Traditional review requests via SMS or email suffer from dismal open rates (<5%), while manual searching on Google Maps creates high friction for customers.",
    solution:
      "Architected and deployed an end-to-end multi-tenant MERN SaaS platform combining physical NFC hardware (NTAG213/215 chips) and dynamic QR codes with Google Gemini 1.5 Flash AI. When customers tap an NFC standee or scan the QR code, the web app launches instantly, uses Gemini AI to generate a personalized review draft based on their rating, and enables 1-click copy directly into Google Maps reviews under strict anti-gating compliance.",
    architecture: [
      "Frontend: React.js, TypeScript, Vite, Tailwind CSS for sub-second mobile page loads",
      "AI Engine: Google Gemini 1.5 Flash API for low-latency review prompt generation",
      "Backend: Node.js, Express.js RESTful API with modular MVC architecture",
      "Database: MongoDB with multi-tenant tenancy isolation and tap telemetry indexing",
      "Security: JWT-based Role-Based Access Control (RBAC), bcrypt encryption, rate limiting",
      "Hardware: NTAG213/215 NFC chip payload encoding and dynamic QR redirection"
    ],
    results: [
      "1-Tap frictionless review flow reducing customer friction by over 80%",
      "Sub-second mobile loading speed on consumer smartphones via Vite & Tailwind",
      "Strict Google anti-gating compliance preventing review policy violations",
      "Full multi-tenant tenant isolation with real-time analytics dashboard"
    ],
    stack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google Gemini AI",
      "NFC Technology",
      "Tailwind CSS"
    ]
  },

  {
    id: "unitynivo",
    title: "UnityNivo – Corporate Employee Engagement Platform",
    subtitle: "Unified social workplace platform for celebrating employee milestones",
    client: "Corporate & Remote Enterprise Teams",
    role: "Full-Stack Developer & Deployment Specialist",
    timeline: "2025 – 2026",
    liveUrl: "https://unitynivo.com/",
    challenge:
      "Hybrid and remote organizations faced low workplace morale and scattered communication channels for celebrating team birthdays, work anniversaries, and company milestones.",
    solution:
      "Engineered an end-to-end corporate engagement platform from scratch. Designed responsive user interfaces in React.js and Next.js, architected secure backend REST APIs with Node.js and Express.js, implemented state management with Context API, and managed full production deployment on a live server.",
    architecture: [
      "Frontend: React.js and Next.js with modular UI components and responsive styling",
      "State Management: React Context API with persistent user session management",
      "Backend: Node.js and Express.js RESTful APIs with input validation",
      "Hosting & Deployment: Live server configuration, SSL certificate, and domain management",
      "Data Communication: Axios HTTP client with centralized interceptors and error handling"
    ],
    results: [
      "100% production-ready deployment with custom domain and SSL",
      "Seamless responsiveness across desktop, tablet, and mobile browsers",
      "Modular, reusable UI architecture facilitating rapid feature additions",
      "High performance with predictable state management and low latency"
    ],
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Bootstrap",
      "REST APIs",
      "Context API",
      "Axios"
    ]
  },

  {
    id: "bezzflow",
    title: "Bezzflow – Scalable Enterprise Management System",
    subtitle: "High-performance enterprise web application with reusable component systems",
    client: "Enterprise Operations",
    role: "Full-Stack / Frontend Engineer",
    timeline: "2025",
    liveUrl: null,
    challenge:
      "Enterprise teams required a dependable, fast web application capable of handling high-volume operational workflows without performance degradation or complex training curves.",
    solution:
      "Developed a robust enterprise web application using React.js, Next.js, and Bootstrap. Built a modular, reusable design system, connected complex backend REST APIs, handled asynchronous state transitions cleanly, and optimized rendering to eliminate UI stuttering.",
    architecture: [
      "Frontend Architecture: Modular React component hierarchy with typed contracts",
      "State Flow: Context API with segregated context domains for minimal re-renders",
      "Network Layer: Axios client with request/response interceptors and error handling",
      "Layouts: Responsive grid systems built for data-dense business views"
    ],
    results: [
      "Scalable frontend architecture adopted across internal operational workflows",
      "Consistent UI design system reducing development time for new views",
      "Smooth data fetching and optimistic UI updates"
    ],
    stack: [
      "React.js",
      "Next.js",
      "Bootstrap",
      "Context API",
      "Axios",
      "REST APIs"
    ]
  }
];

