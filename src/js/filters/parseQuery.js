export function parseQuery (queryString) {
	let query = {};
	let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	for (let i = 0; i < pairs.length; i++) {
		let pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
}
