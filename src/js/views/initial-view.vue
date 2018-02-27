<template>
	<div class="initial-view"></div>
</template>

<script>
	export default {
		name: 'initial-view'
	};
</script>

<style lang="scss" type="text/scss">
	.initial-view {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color: white;
		z-index: 2;
		background: linear-gradient(to bottom, $primaryColour 0%, darken( $primaryColour, 15% ) 100%);
	}
</style>
