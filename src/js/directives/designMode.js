function randomStr () {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	for (var i = 0; i < 10; i++)		{ text += possible.charAt(Math.floor(Math.random() * possible.length)); }

	return text;
}

function addCSSRule (sheet, selector, rules, index) {
	if ('insertRule' in sheet) {
		sheet.insertRule(selector + '{' + rules + '}', index);
	}	else if ('addRule' in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

function applyClass (el, cssClass) {
	el.classList.add(cssClass);
}

function createClass () {
	return `
			box-shadow: inset 0 0 0 1px red;
		`;
}

export default function designMode () {
	return {
		bind (el) {
			let randomClass = randomStr();
			let styleSheet = document.styleSheets[document.styleSheets.length - 1];
			applyClass(el, randomClass);
			addCSSRule(
				styleSheet,
				`.${randomClass}`,
				createClass()
			);
			addCSSRule(
				styleSheet,
				`.${randomClass} *`,
				createClass()
			);
		}
	};
};
