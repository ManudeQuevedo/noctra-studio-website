"use client";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Noctra Studio",
    url: "https://noctra.studio",
    logo: "https://noctra.studio/noctra-studio-icon-dark-theme.svg",
    description:
      "Strategic web development studio. Websites that generate measurable ROI. From $20k MXN + IVA. Results guarantee.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Querétaro",
      addressCountry: "MX",
    },
    sameAs: [
      "https://instagram.com/noctra_studio",
      "https://x.com/NoctraStudio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@noctra.studio",
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
    description:
      "Strategic web development for businesses that need measurable results.",
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

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Noctra Studio",
    url: "https://noctra.studio",
    email: "hola@noctra.studio",
    description:
      "Strategic web development studio in Querétaro, Mexico. Websites that generate measurable ROI.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Querétaro",
      addressRegion: "Querétaro",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.5888",
      longitude: "-100.3899",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const services = [
    {
      "@type": "Service",
      name: "Professional Website Development",
      description:
        "Convert visitors into clients while you sleep. Forms that generate qualified leads, speed that keeps visitors (+40% conversion), technical SEO, and analytics showing real ROI.",
      provider: { "@type": "Organization", name: "Noctra Studio" },
      areaServed: { "@type": "Country", name: "Mexico" },
      offers: {
        "@type": "Offer",
        price: "20000",
        priceCurrency: "MXN",
        valueAddedTaxIncluded: false,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "20000",
          priceCurrency: "MXN",
          valueAddedTaxIncluded: false,
          unitText: "starting price",
        },
      },
    },
    {
      "@type": "Service",
      name: "E-commerce Development",
      description:
        "From visit to sale in 3 clicks. Conversion-oriented catalog, frictionless purchase process, inventory integration, and real-time sales dashboard.",
      provider: { "@type": "Organization", name: "Noctra Studio" },
      areaServed: { "@type": "Country", name: "Mexico" },
      offers: {
        "@type": "Offer",
        price: "35000",
        priceCurrency: "MXN",
        valueAddedTaxIncluded: false,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "35000",
          priceCurrency: "MXN",
          valueAddedTaxIncluded: false,
          unitText: "starting price",
        },
      },
    },
    {
      "@type": "Service",
      name: "Custom Web Systems",
      description:
        "Recover 15+ hours weekly automating manual processes. Custom CRM, management systems that eliminate spreadsheets, integrations between your tools.",
      provider: { "@type": "Organization", name: "Noctra Studio" },
      areaServed: { "@type": "Country", name: "Mexico" },
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: "MXN",
        valueAddedTaxIncluded: false,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "50000",
          priceCurrency: "MXN",
          valueAddedTaxIncluded: false,
          unitText: "starting price",
        },
      },
    },
    {
      "@type": "Service",
      name: "Maintenance & Growth",
      description:
        "Each month faster, more visible, more conversions. Monthly metrics analysis, continuous improvements based on real user behavior, priority support.",
      provider: { "@type": "Organization", name: "Noctra Studio" },
      areaServed: { "@type": "Country", name: "Mexico" },
      offers: {
        "@type": "Offer",
        price: "5000",
        priceCurrency: "MXN",
        valueAddedTaxIncluded: false,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "5000",
          priceCurrency: "MXN",
          valueAddedTaxIncluded: false,
          unitText: "per month",
        },
      },
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": services,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why should I trust a new agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Instead of hiding that we're new, we use it as an advantage: (1) Direct founder access, not junior staff, (2) Better pricing as we build our portfolio, (3) Cutting-edge technology, not legacy systems, (4) Results guarantee or proportional refund.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I'm not satisfied with the result?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We establish clear KPIs before starting. We track these monthly. If we don't meet the agreed KPIs within the first 60 days, you get a proportional refund. This is in the contract.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it really take to see results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Immediate results: site speed, professional appearance, working forms - day 1. SEO results: 2-3 months. Lead generation: 30-40 qualified leads within first 3 months. Full ROI: Most clients recover investment in 6-8 months.",
        },
      },
      {
        "@type": "Question",
        name: "What do I need to have ready before starting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Minimum: Clear business objective, access to brand assets if you have them, 1-2 hours weekly for feedback. We handle everything else: copywriting, design, technical implementation, hosting setup.",
        },
      },
      {
        "@type": "Question",
        name: "What happens with the site after the project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You own everything: code, content, domain, hosting accounts. You can hire us for maintenance, hire another developer (we provide full documentation), or manage it yourself. No lock-in, ever.",
        },
      },
      {
        "@type": "Question",
        name: "Why not use WordPress/Wix/Squarespace?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use Next.js because: Speed (<1 second load vs 5-8 seconds WordPress), no plugins breaking, better SEO (Google prioritizes fast sites), lower long-term cost ($5k/year vs $15k+ WordPress).",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with my specific industry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We focus on business fundamentals that work across industries: lead generation, conversion optimization, user experience. If your business needs clients or customers online, we can help.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
