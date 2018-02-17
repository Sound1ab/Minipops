<template>
	<div @click="handleClick" class="close-button">
		<svgicon
			name="close"
			:color="color"
			width="30"
			height="30"
		>
		</svgicon>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import '@/assets/compiled-icons/close';
	export default {
		name: 'CloseButton',
		props: {
			color: VueTypes.string.def('white')
		},
		methods: {
			handleClick () {
				this.$emit('closeClick');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.close-button {
		cursor: pointer;
	}
</style>
