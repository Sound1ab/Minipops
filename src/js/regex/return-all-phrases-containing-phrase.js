export function returnAllPhrasesContainingPhrase (words) {
	let regex = words.map(el => {
		return `(?=.*\\b${el}\\b)`;
	}).join('');
	return new RegExp(`^${regex}.*$`, 'gi');
}
