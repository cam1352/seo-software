import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seosoftware.io';

  const routes = [
    '',
    '/audit',
    '/keywords',
    '/geo',
    '/backlinks',
    '/domain',
    '/gap',
    '/content',
    '/faq',
    '/blogs',
    '/pricing',
    '/contact',
    '/privacy',
    '/terms',
    '/settings',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
