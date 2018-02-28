<template>
	<div>
		<div v-if="$route.name === 'discovery'" @click="handleBackClick" class="menu-button">
			<svgicon
				name="chevron-left"
				:color="color"
				width="30"
				height="30"
				id="back-button"
			>
			</svgicon>
		</div>
		<div v-else @click="handleMenuClick" class="menu-button">
			<svgicon
				name="menu"
				:color="color"
				width="30"
				height="30"
			>
			</svgicon>
		</div>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import '@/assets/compiled-icons/menu';
	import '@/assets/compiled-icons/chevron-left';
	export default {
		name: 'menu-button',
		props: {
			color: VueTypes.string.def('white')
		},
		methods: {
			handleMenuClick () {
				this.$emit('menuClick');
			},
			handleBackClick () {
				this.$emit('backClick');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.menu-button {
		cursor: pointer;
	}
</style>
