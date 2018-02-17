export class PullToRefresh {
	constructor (id) {
		this.el = document.getElementById(id);
		this.startY = null;
		this.boundary = 70;
		this.pullDistance = null;
	}
	touchStart () {
		this.el.addEventListener('touchstart', e => {
			this.startY = e.touches[0].pageY;
			this.el.style.transition = 'none .5s';
		}, {passive: true});
	}
	touchEnd (callback) {
		this.el.addEventListener('touchend', e => {
			this.el.style.transition = 'all .5s';
			this.el.style.transform = '';
			if (this.pullDistance > this.boundary) {
				console.log('fire', this.pullDistance);
				this.reset();
				callback();
			}
		}, {passive: true});
	}
	touchMove () {
		this.el.addEventListener('touchmove', e => {
			const pageY = e.touches[0].pageY;
			if (this.isOverscrollAboveScrollRegion(pageY)) {
				e.preventDefault();
				this.pullDistance = (pageY - this.startY) / 2.5;
				this.moveScrollRegionWhenOverscrolled();
			}
		}, {passive: false});
	}
	isOverscrollAboveScrollRegion (pageY) {
		let aboveScrollRegion;
		if (this.el.scrollTop === 0 &&
			pageY > this.startY &&
			!document.body.classList.contains('refreshing')) {
			aboveScrollRegion = true;
		} else {
			aboveScrollRegion = false;
		}
		return aboveScrollRegion;
	}
	moveScrollRegionWhenOverscrolled () {
		this.el.style.transform = `translate3d( 0, ${this.pullDistance}px, 0 )`;
	}
	reset () {
		this.pullDistance = 0;
	}
	init (callback) {
		this.touchStart();
		this.touchEnd(callback);
		this.touchMove();
	}
}
