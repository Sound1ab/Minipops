/* eslint-disable */
export function toFixed (num, fixed) {
	let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
	return num.toString().match(re)[0];
}
