<template>
	<transition-group
		name="staggered-enter"
		tag="span"
		:css="false"
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
	>
		<slot></slot>
	</transition-group>
</template>

<script>
	import Velocity from 'velocity-animate';
	export default {
		name: 'StaggeredEnter',
		methods: {
			beforeEnter: function (el) {
				el.style.opacity = 0;
			},
			enter: function (el, done) {
				var delay = el.getAttribute('data-index') * 200;
				setTimeout(function () {
					Velocity(
						el,
						{opacity: 1, translateX: [0, -100]},
						{complete: done}
					);
				}, delay);
			},
			leave: function (el, done) {
				Velocity(
					el,
					{display: 'none'},
					{complete: done}
				);
			}
		}
	};
</script>

