<template>
	<span class="spin360" :class="{'spin360__pause': !rotate}">
		<slot></slot>
	</span>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'Spin360Infinite',
		props: {
			rotate: VueTypes.bool.def(false)
		}
	};
</script>

<style lang="scss" type="text/scss">
	.spin360 {
		display: inline-block;
		font-size: 18px;
		animation: rotating 2s linear infinite;
		animation-play-state: running;
		&__pause {
			// fix for ios safari - otherwise doesn't pause - classic safari
			-webkit-animation: none !important;
			animation-play-state: paused;
		}
	}

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
