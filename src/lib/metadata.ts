import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PageKey = 'home' | 'about' | 'services' | 'contact' | 'blog';

export async function generatePageMetadata(
  locale: string,
  page: PageKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noctra.studio';
  const pagePath = page === 'home' ? '' : page;
  const localePath = locale === 'en' ? '' : `${locale}/`;
  
  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    keywords: t(`${page}.keywords`),
    
    // Open Graph
    openGraph: {
      title: t(`${page}.og_title`),
      description: t(`${page}.og_description`),
      url: `${baseUrl}/${localePath}${pagePath}`,
      siteName: 'Noctra Studio',
      locale: locale === 'en' ? 'en_US' : 'es_MX',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t(`${page}.og_image_alt`),
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t(`${page}.twitter_title`),
      description: t(`${page}.twitter_description`),
      images: [`${baseUrl}/twitter-image.jpg`],
    },
    
    // Alternate languages
    alternates: {
      canonical: `${baseUrl}/${pagePath}`,
      languages: {
        'en': `${baseUrl}/${pagePath}`,
        'es': `${baseUrl}/es/${pagePath}`,
      },
    },
    
    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
