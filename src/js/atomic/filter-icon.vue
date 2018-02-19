<template>
	<svgicon
		name="filter-variant"
		:color="disabled ? 'grey' : 'white'"
		width="30"
		height="30"
		class="filter-icon"
	>
	</svgicon>
</template>

<script>
	import VueTypes from 'vue-types';
	import '@/assets/compiled-icons/filter-variant';
	export default {
		name: 'filter-icon',
		props: {
			disabled: VueTypes.bool.def(false)
		}
	};
</script>

<style lang="scss" type="text/scss">
	.filter-icon {
		cursor: pointer;
	}
</style>
