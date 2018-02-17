<template>
	<div
		class="floating-menu"
	>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'floating-menu'
	};
</script>

<style lang="scss" type="text/scss">
	.floating-menu {
		z-index: 2;
		background-color: white;
		padding: em(24);
		border-radius: 25px;
		white-space: nowrap;
	}
</style>
