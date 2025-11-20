import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noctra.studio';
  const lastModified = new Date();
  
  const pages = ['', 'about', 'services', 'contact', 'blog', 'privacy', 'terms'];
  
  return pages.map(page => ({
    url: `${baseUrl}/${page}`,
    lastModified,
    changeFrequency: page === '' ? 'weekly' : 'monthly' as const,
    priority: page === '' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/${page}`,
        es: `${baseUrl}/es/${page}`,
      },
    },
  }));
}
