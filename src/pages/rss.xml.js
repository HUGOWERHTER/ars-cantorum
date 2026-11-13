import rss from '@astrojs/rss';

export async function GET(context) {
  const postModules = import.meta.glob('../content/articulos/*.md', { eager: true });
  
  const items = Object.entries(postModules).map(([path, mod]) => {
    const slug = path.split(/[\\/]/).pop()?.replace('.md', '');
    const dateStr = mod.frontmatter?.date || '2026-11-12';
    
    return {
      title: mod.frontmatter?.title || 'Artículo sin título',
      pubDate: new Date(dateStr),
      description: mod.frontmatter?.description || 'Ensayo de investigación vocal y pedagogía del Bel Canto.',
      link: `/articulos/${slug}/`,
      categories: mod.frontmatter?.tags || ['Bel Canto', 'Canto Lírico'],
      author: mod.frontmatter?.author || 'Ars Cantorum',
    };
  });

  // Ordenar por fecha descendente
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Ars Cantorum — El Arte del Canto',
    description: 'Ensayos sobre la tradición del Bel Canto, pedagogía vocal comparada y acústica musical.',
    site: context.site || 'https://arscantorum.com',
    items: items,
    customData: `<language>es-ES</language><copyright>Ars Cantorum</copyright>`,
  });
}
