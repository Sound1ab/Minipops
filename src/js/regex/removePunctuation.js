/*eslint-disable */
export function removePunctuation (str) {
	str = str.replace(/ *\([^)]*\) */g, "");
	return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
}
