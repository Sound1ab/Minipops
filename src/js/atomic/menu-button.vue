<template>
	<div @click="handleClick" class="menu-button">
		<svgicon
			name="menu"
			:color="color"
			width="30"
			height="30"
			id="open-menu"
		>
		</svgicon>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import '@/assets/compiled-icons/menu';
	export default {
		name: 'menu-button',
		props: {
			color: VueTypes.string.def('white')
		},
		methods: {
			handleClick () {
				this.$emit('menuClick');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.menu-button {
		cursor: pointer;
	}
</style>
