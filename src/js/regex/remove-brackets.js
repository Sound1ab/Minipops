export function removeBrackets (str) {
	return str.replace(/ *\([^)]*\) */g, '');
}
