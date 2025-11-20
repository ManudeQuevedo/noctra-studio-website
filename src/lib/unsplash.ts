import { createApi } from 'unsplash-js';

// Initialize Unsplash API
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export type UnsplashImage = {
  url: string;
  blurUrl: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
};

// Cache for 24 hours (in seconds)
export const REVALIDATE_TIME = 86400;

export async function getServiceImage(query: string): Promise<UnsplashImage | null> {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash Access Key is missing');
    return null;
  }

  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape',
      count: 1,
    });

    if (result.errors) {
      console.error('Unsplash API error:', result.errors);
      return null;
    }

    const photo = Array.isArray(result.response) ? result.response[0] : result.response;

    if (!photo) return null;

    return {
      url: photo.urls.regular,
      blurUrl: photo.urls.thumb,
      alt: photo.alt_description || query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    };
  } catch (error) {
    console.error('Unsplash fetch error:', error);
    return null;
  }
}

export const SERVICE_QUERIES = {
  web: 'modern web development code minimal dark',
  branding: 'minimalist abstract design dark texture',
  ai: 'artificial intelligence neural network dark',
  seo: 'data analytics graph dark futuristic',
};
