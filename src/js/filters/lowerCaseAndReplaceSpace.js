export function lowerCaseAndReplaceSpace (phrase = '', replacement = '') {
	return phrase.replace(/\s/g, replacement).toLowerCase();
}
