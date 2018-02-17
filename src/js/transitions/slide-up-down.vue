<template>
	<transition
		name="dropdown"
		:css="false"
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
	>
		<slot></slot>
	</transition>
</template>

<script>
	import VueTypes from 'vue-types';
	import Velocity from 'velocity-animate';

	export default {
		name: 'SlideUpDown',
		props: {
			finalDisplay: VueTypes.string.def('block')
		},
		methods: {
			beforeEnter: function (el, done) {
				el.style.opacity = 0;
			},
			enter: function (el, done) {
				Velocity(el, {opacity: 1}, {
					duration: 350,
					easing: 'easeOutSine',
					display: this.finalDisplay,
					queue: false
				}, {complete: done});
				Velocity(el, 'slideDown', {
					duration: 350,
					easing: 'easeOutSine',
					display: this.finalDisplay
				},
					{complete: done});
			},
			leave: function (el, done) {
				Velocity(el, 'slideUp', {
					duration: 350,
					easing: 'easeOutSine',
					queue: false
				});
				Velocity(el, {opacity: 0}, {
					duration: 350,
					easing: 'easeOutSine',
					display: this.finalDisplay
				},
					{complete: done});
			}
		}
	};
</script>
