import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seosoftware.io';

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/cloud-seo-platform', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/rank-tracking-software', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/agency-seo-suite', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/tools/indexnow-pinger', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/audit', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/keywords', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/geo', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/backlinks', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'weekly' as const },
    { path: '/blogs', priority: 0.75, changeFrequency: 'weekly' as const },
    { path: '/domain', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/gap', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/content', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/settings', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
