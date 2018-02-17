import Hammer from 'hammerjs';

export default function swipeToDelete () {
	let resistance;
	let pullDistance;
	function start (el, e) {
		setAttribute(el, 'prevent-click', 'preventing');
	}
	function touch (el, e) {
		e.srcEvent.preventDefault();
		if (e.deltaX <= 0 && getAttribute(el, 'swipe-to-delete') !== 'swiped') {
			removeTransition(el);
			pullDistance = Math.abs(e.deltaX) / resistance;
			moveElement(el, -(pullDistance));
		} else if (e.deltaX > 0 && getAttribute(el, 'swipe-to-delete') === 'swiped' && e.distance > 20) {
			reset(el);
		}
	}
	function end (el, boundary, translateX, e) {
		setTimeout(function () {
			setAttribute(el, 'prevent-click', 'click-through');
		}, 300);
		addTransition(el);
		if (pullDistance > boundary) {
			moveElement(el, -(translateX));
			setAttribute(el, 'swipe-to-delete', 'swiped');
		} else {
			moveElement(el, 0);
		}
	}
	function moveElement (el, pullDistance) {
		el.style.transform = `translate3d(${pullDistance}px, 0, 0 )`;
	}
	function addTransition (el) {
		el.style.transition = 'all .5s';
	}
	function removeTransition (el) {
		el.style.transition = 'none';
	}
	function setAttribute (el, name, val) {
		el.setAttribute(name, val);
	}
	function getAttribute (el, name) {
		return el.getAttribute(name);
	}
	function reset (el) {
		moveElement(el, 0);
		pullDistance = 0;
		setAttribute(el, 'swipe-to-delete', 'start');
	}
	function init (hammertime, el, boundary, translateX) {
		hammertime.on('panmove', touch.bind(null, el));
		hammertime.on('panstart', start.bind(null, el));
		hammertime.on('panend', end.bind(null, el, boundary, translateX));
	}
	return {
		bind (element, binding) {
			const hammertime = new Hammer(element);
			const boundary = binding.value.value.boundary;
			const translateX = binding.value.value.translateX;
			const disable = binding.value.value.disable;
			if (disable) {
				return;
			}
			resistance = 2.5;
			init(hammertime, element, boundary, translateX);
		}
	};
};
