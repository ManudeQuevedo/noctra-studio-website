import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Use 'as-needed' to hide default locale from URL
  // This reduces navigation and keeps URLs cleaner
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/work': '/work',
    '/contact': '/contact',
    '/careers': '/careers',
    '/blog': '/blog',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/studio': '/studio',
    '/dashboard': '/dashboard',
    '/admin': '/admin',
    '/login': '/login'
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
