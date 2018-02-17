export default function pullToRefresh () {
	let el;
	let startY;
	let boundary;
	let pullDistance;
	let resistance;
	function touchStart () {
		el.addEventListener('touchstart', e => {
			startY = e.touches[0].pageY;
			el.style.transition = 'none .5s';
		}, {passive: true});
	}
	function touchEnd (callback) {
		el.addEventListener('touchend', e => {
			el.style.transition = 'all .5s';
			el.style.transform = '';
			if (pullDistance > boundary) {
				console.log('fire', pullDistance);
				reset();
				callback();
			}
		}, {passive: true});
	}
	function touchMove (callback) {
		el.addEventListener('touchmove', e => {
			const pageY = e.touches[0].pageY;
			if (isOverscrollAboveScrollRegion(pageY)) {
				e.preventDefault();
				pullDistance = (pageY - startY) / resistance;
				moveScrollRegionWhenOverscrolled();
				callback(pullDistance, boundary);
			}
		}, {passive: false});
	}
	function isOverscrollAboveScrollRegion (pageY) {
		let aboveScrollRegion;
		if (el.scrollTop === 0 &&
			pageY > startY &&
			!document.body.classList.contains('refreshing')) {
			aboveScrollRegion = true;
		} else {
			aboveScrollRegion = false;
		}
		return aboveScrollRegion;
	}
	function moveScrollRegionWhenOverscrolled () {
		el.style.transform = `translate3d( 0, ${pullDistance}px, 0 )`;
	}
	function reset () {
		pullDistance = 0;
	}
	function init (callbackOnEnd, callbackOnMove) {
		touchStart();
		touchEnd(callbackOnEnd);
		touchMove(callbackOnMove);
	}
	return {
		bind (element, binding) {
			el = element;
			boundary = 70;
			resistance = 2.5;
			init(binding.value.callbackOnEnd, binding.value.callbackOnMove);
		}
	};
};
