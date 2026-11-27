import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
	const site = 'https://www.arscantorum.com';
	const today = new Date().toISOString().slice(0, 10);
	const postModules = import.meta.glob('../content/articulos/*.md', { eager: true });

	const urls: { loc: string; lastmod: string; priority: string }[] = [
		{ loc: `${site}/`, lastmod: today, priority: '1.0' },
		{ loc: `${site}/sobre/`, lastmod: today, priority: '0.8' },
	];

	Object.entries(postModules).forEach(([path, mod]: [string, any]) => {
		const slug = path.split(/[\\/]/).pop()?.replace('.md', '');
		const dateStr = mod.frontmatter?.date || '2026-11-01';
		if (slug && dateStr <= today) {
			urls.push({
				loc: `${site}/articulos/${slug}/`,
				lastmod: dateStr,
				priority: '0.9',
			});
		}
	});

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
