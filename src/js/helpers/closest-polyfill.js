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
