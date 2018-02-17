<template>
	<div class="scrolling-container">
	    <slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'scrolling-container'
	};
</script>

<style lang="scss" type="text/scss">
	.scrolling-container {
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-y: contain;
	}
</style>
