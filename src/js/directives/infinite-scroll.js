function intersectionCallback (callback, entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			callback();
			observer.unobserve(entry.target);
		}
	});
}

function intersectOptions (root) {
	return {
		root,
		rootMargin: '100px 0px',
		threshold: 0
	};
}

function setupObserver ({el, root, callback}) {
	let observer = new IntersectionObserver(intersectionCallback.bind(null, callback), intersectOptions(root));
	observer.observe(el);
}

export default function infiniteScroll () {
	return {
		bind (el, {value: {root, callback, lastElement}}) {
			let parent;
			if (typeof root === 'string') {
				parent = document.getElementById(root);
			} else {
				parent = null;
			}
			if (lastElement) {
				setupObserver({el, parent, callback});
			}
		}
	};
};
