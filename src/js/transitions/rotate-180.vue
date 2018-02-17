<template>
	<span>
		<span class="rotate" :class="{'spin': rotate}">
			<slot></slot>
		</span>
	</span>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'Rotate180',
		props: {
			rotate: VueTypes.bool.def(false)
		}
	};
</script>

<style lang="scss" type="text/scss">
	.rotate {
		display: inline-block;
		transform: rotate(0);
		transition: all .25s;
		&.spin {
			transform: rotate(-180deg);
		}
	}
</style>
