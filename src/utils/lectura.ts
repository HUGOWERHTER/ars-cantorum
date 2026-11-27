export function calcularTiempoLectura(rawContent?: string, fallback = '5 min'): string {
	if (!rawContent || typeof rawContent !== 'string') return fallback;
	const sinFrontmatter = rawContent.replace(/^---[\s\S]*?---/, '');
	const textoLimpio = sinFrontmatter
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`~|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	const palabras = textoLimpio ? textoLimpio.split(' ').length : 0;
	if (!palabras) return fallback;
	const minutos = Math.max(1, Math.round(palabras / 200));
	return `${minutos} min`;
}
