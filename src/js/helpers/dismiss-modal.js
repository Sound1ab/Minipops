import Hammer from 'hammerjs';
const hammertime = new Hammer(document);

function addClosest () {
	if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (selector) {
			var el = this;
			while (el) {
				if (el.matches(selector)) {
					return el;
				}
				el = el.parentElement;
			}
		};
	}
}

export function watch (selector, callback) {
	addClosest();
	hammertime.domEvents = true;
	hammertime.on('tap', checkIfInModal.bind(null, selector, callback));
}

// Selector needs to be and id '#side-bar' or an element name i.e. div
function checkIfInModal (selector, callback, event) {
	let inModal = !!event.target.closest(selector);
	if (!inModal) {
		callback();
		unwatch(hammertime);
	}
}

export function unwatch () {
	hammertime.off('tap');
}
