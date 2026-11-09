/* global process */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, "../dist");
const BASE_INDEX_PATH = path.join(DIST_DIR, "index.html");
const SITE_URL = "https://shri-laxman-frontend.vercel.app";

// Import services data definitions
const servicePages = [
  {
    slug: "freelance-web-development",
    shortTitle: "Web Development",
    title: "Hire Freelance Web Developer | Custom Websites & Web Apps | Piyush Vishwakarma",
    description: "Hire Piyush Vishwakarma, freelance web developer specializing in custom business websites, scalable web applications, modern UI/UX, and end-to-end full-stack solutions.",
    keywords: "Hire Freelance Web Developer, Freelance Website Developer, Custom Website Development, Business Website Development, Remote Full Stack Developer, Freelance Web Developer India",
  },
  {
    slug: "mern-stack-development",
    shortTitle: "MERN Stack",
    title: "Freelance MERN Stack Developer | React, Node, Express & MongoDB | Piyush Vishwakarma",
    description: "Hire Piyush Vishwakarma, professional freelance MERN Stack Developer. Building scalable full-stack web applications with MongoDB, Express.js, React.js, and Node.js.",
    keywords: "Freelance MERN Stack Developer, Hire MERN Developer, Full Stack Developer India, MongoDB Express React Node, MERN Web Application Development, REST API Developer",
  },
  {
    slug: "react-js-development",
    shortTitle: "React.js",
    title: "Hire React.js Developer | Custom React Web App Development Services | Piyush Vishwakarma",
    description: "Hire freelance React.js developer Piyush Vishwakarma. Specializing in modular component architecture, state management, Tailwind CSS, performance optimization, and responsive UIs.",
    keywords: "Hire React.js Developer, React Developer India, React.js Development Services, Freelance React Engineer, Front End Developer React, Single Page Application React",
  },
  {
    slug: "node-js-backend-development",
    shortTitle: "Node.js Backend",
    title: "Node.js Backend Developer | Scalable REST API & Express.js Services | Piyush Vishwakarma",
    description: "Professional Node.js backend development by Piyush Vishwakarma. Secure RESTful APIs, Express.js architecture, MongoDB integration, authentication, and database optimization.",
    keywords: "Node.js Backend Developer, REST API Development, Express.js Developer, Backend Developer India, Freelance Node Developer, MongoDB REST API",
  },
  {
    slug: "next-js-development",
    shortTitle: "Next.js",
    title: "Next.js Developer | Fast SSR, SSG & Modern Web Applications | Piyush Vishwakarma",
    description: "Hire freelance Next.js developer Piyush Vishwakarma. Build server-rendered (SSR), statically generated (SSG), and SEO-first web applications with unmatched speed.",
    keywords: "Next.js Developer, Hire Next.js Developer, Next.js Development Services, Server Side Rendering React, Full Stack Next.js, Nextjs Freelancer India",
  },
  {
    slug: "website-development-lucknow",
    shortTitle: "Lucknow Developer",
    title: "Website Developer in Lucknow | Freelance Web & MERN Developer India | Piyush Vishwakarma",
    description: "Looking for a professional website developer in Lucknow? Piyush Vishwakarma delivers custom business websites, MERN stack web apps, and SEO-optimized digital solutions.",
    keywords: "Website Developer in Lucknow, Freelance Web Developer in Lucknow, Web Development Company Lucknow, Best Web Developer Lucknow, Hire Web Developer India, Lucknow Website Designer",
  },
];

function generateSeoPages() {
  if (!fs.existsSync(BASE_INDEX_PATH)) {
    console.error(`Error: Base index.html not found at ${BASE_INDEX_PATH}. Run vite build first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(BASE_INDEX_PATH, "utf-8");

  for (const page of servicePages) {
    const canonicalUrl = `${SITE_URL}/${page.slug}`;

    let pageHtml = baseHtml;

    // 1. Replace Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${page.title}</title>`
    );

    // 2. Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${page.description}" />`
    );

    // 3. Replace Meta Keywords
    pageHtml = pageHtml.replace(
      /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i,
      `<meta name="keywords" content="${page.keywords}" />`
    );

    // 4. Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 5. Replace Open Graph Tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${page.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${page.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // 6. Replace Twitter Tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${page.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${page.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:url" content="${canonicalUrl}" />`
    );

    // 7. Inject Service Schema + BreadcrumbList Schema
    const serviceSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.title,
        description: page.description,
        provider: {
          "@type": "Person",
          name: "Piyush Vishwakarma",
          url: "https://shri-laxman-frontend.vercel.app/",
          jobTitle: "Freelance MERN Stack & Full Stack Developer",
          telephone: "+919794125123",
          email: "mailto:vishwakarmapiyush327@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lucknow",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
        },
        serviceType: page.shortTitle,
        url: canonicalUrl,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.shortTitle,
            item: canonicalUrl,
          },
        ],
      },
    ];

    const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(
      serviceSchemas,
      null,
      2
    )}\n  </script>`;

    pageHtml = pageHtml.replace("</head>", `${schemaScript}\n</head>`);

    // Target directory: dist/<slug>/index.html
    const targetDir = path.join(DIST_DIR, page.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFilePath = path.join(targetDir, "index.html");
    fs.writeFileSync(targetFilePath, pageHtml, "utf-8");

    // Also write dist/<slug>.html for direct flat serving
    const targetFlatPath = path.join(DIST_DIR, `${page.slug}.html`);
    fs.writeFileSync(targetFlatPath, pageHtml, "utf-8");

    console.log(`✓ Prerendered SEO Page with JSON-LD: /${page.slug} -> ${targetFilePath}`);
  }

  // Also generate 404.html
  let notFoundHtml = baseHtml;
  notFoundHtml = notFoundHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>404 - Page Not Found | Piyush Vishwakarma</title>`
  );
  notFoundHtml = notFoundHtml.replace(
    /<meta\s+name="robots"\s+content=".*?"\s*\/?>/i,
    `<meta name="robots" content="noindex, nofollow" />`
  );
  fs.writeFileSync(path.join(DIST_DIR, "404.html"), notFoundHtml, "utf-8");
  console.log(`✓ Generated 404.html with noindex directive.`);
}

generateSeoPages();
