"use client";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Noctra Studio",
    url: "https://noctra.studio",
    logo: "https://noctra.studio/logo.png",
    description:
      "Digital architecture and web development firm specializing in premium web solutions, branding, and SEO strategies.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
    },
    sameAs: [
      // Add your social media URLs here
      // "https://twitter.com/noctrastudio",
      // "https://linkedin.com/company/noctrastudio"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Spanish"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Noctra Studio",
    url: "https://noctra.studio",
    description: "Premium web development, branding, and SEO strategies.",
    inLanguage: ["en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://noctra.studio/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
