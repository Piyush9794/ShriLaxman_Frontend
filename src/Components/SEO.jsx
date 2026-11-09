import { useEffect } from "react";

const SITE_URL = "https://shri-laxman-frontend.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/Lax.png`;
const DEFAULT_AUTHOR = "Piyush Vishwakarma";

function setOrCreateMetaTag(attrName, attrValue, content) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SEO({
  title = "Piyush Vishwakarma | Freelance MERN Stack & Full Stack Developer",
  description = "Hire Piyush Vishwakarma, Freelance Full Stack MERN Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, REST APIs and custom web applications. Available for freelance projects and remote opportunities.",
  keywords = "Hire Freelance Web Developer, Freelance MERN Stack Developer, Hire React.js Developer, Hire Full Stack Developer, Freelance Website Developer, Node.js Backend Developer, Website Developer in Lucknow, Remote Full Stack Developer",
  canonical = SITE_URL,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  structuredData = null,
  breadcrumbs = null,
}) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // 2. Standard Meta Tags
    setOrCreateMetaTag("name", "description", description);
    if (keywords) {
      setOrCreateMetaTag("name", "keywords", keywords);
    }
    setOrCreateMetaTag("name", "author", DEFAULT_AUTHOR);
    setOrCreateMetaTag(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 3. Canonical Link
    const fullCanonical = canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical}`;
    setOrCreateLinkTag("canonical", fullCanonical);

    // 4. Open Graph Tags
    setOrCreateMetaTag("property", "og:title", title);
    setOrCreateMetaTag("property", "og:description", description);
    setOrCreateMetaTag("property", "og:url", fullCanonical);
    setOrCreateMetaTag("property", "og:type", ogType);
    setOrCreateMetaTag("property", "og:site_name", "Piyush Vishwakarma Portfolio");
    setOrCreateMetaTag("property", "og:locale", "en_US");
    setOrCreateMetaTag("property", "og:image", ogImage);
    setOrCreateMetaTag("property", "og:image:alt", title);

    // 5. Twitter Card Tags
    setOrCreateMetaTag("name", "twitter:card", "summary_large_image");
    setOrCreateMetaTag("name", "twitter:title", title);
    setOrCreateMetaTag("name", "twitter:description", description);
    setOrCreateMetaTag("name", "twitter:image", ogImage);
    setOrCreateMetaTag("name", "twitter:creator", "@Piyush9794");

    // 6. JSON-LD Dynamic Schema
    const schemasToInject = [];

    if (structuredData) {
      if (Array.isArray(structuredData)) {
        schemasToInject.push(...structuredData);
      } else {
        schemasToInject.push(structuredData);
      }
    }

    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      schemasToInject.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.name,
          item: crumb.item.startsWith("http")
            ? crumb.item
            : `${SITE_URL}${crumb.item.startsWith("/") ? "" : "/"}${crumb.item}`,
        })),
      });
    }

    let scriptTag = document.getElementById("dynamic-seo-schema");
    if (schemasToInject.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-seo-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject
      );
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    ogType,
    ogImage,
    noindex,
    structuredData,
    breadcrumbs,
  ]);

  return null;
}

