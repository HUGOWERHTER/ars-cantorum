export function formatearFecha(dateStr: string): string {
	if (!dateStr) return '';
	const parts = dateStr.split('-');
	if (parts.length !== 3) return dateStr;
	const [year, month, day] = parts;
	const meses = [
		'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
		'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
	];
	const mesIndex = parseInt(month, 10) - 1;
	return `${parseInt(day, 10)} de ${meses[mesIndex] || month}, ${year}`;
}
