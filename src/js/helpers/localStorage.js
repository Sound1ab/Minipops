function parseQuery (queryString) {
	let query = {};
	let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	for (let i = 0; i < pairs.length; i++) {
		let pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
}

export function saveToLocalStorage (key, value) {
	window.localStorage.setItem(key, value);
}

export function getFromLocalStorage (key) {
	return window.localStorage.getItem(key);
}

export function removeItemFromLocalStorage (key) {
	return window.localStorage.removeItem(key);
}

export function getUrlQuery () {
	return parseQuery(window.location.search);
}
