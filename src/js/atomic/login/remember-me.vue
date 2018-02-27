<template>
	<div class="remember-me">
	    <input class="remember-me__checkbox" type="checkbox" />
		<p class="remember-me__copy">Remember me</p>
	</div>
</template>

<script>
	export default {
		name: 'remember-me'
	};
</script>

<style lang="scss" type="text/scss">
	.remember-me {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: em(16);
		&__checkbox {
			margin-right: em(8);
		}
		&__copy {
			color: grey;
			margin-bottom: 0;
		}
	}
</style>
