<template>
	<div @click="handleClick" class="back-button">
		<svgicon
			name="chevron-left"
			:color="color"
			width="30"
			height="30"
			id="back-button"
		>
		</svgicon>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import '@/assets/compiled-icons/chevron-left';
	export default {
		name: 'menu-button',
		props: {
			color: VueTypes.string.def('white')
		},
		methods: {
			handleClick () {
				this.$emit('backClick');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.back-button {
		cursor: pointer;
	}
</style>
