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
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.-ms-overflow-style {
		width: 0;
		height: 0;
	}
	.scrolling-container {
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-y: contain;
	}
</style>
