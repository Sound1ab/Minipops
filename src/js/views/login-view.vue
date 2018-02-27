<template>
	<div class="login-view">
		<login-box></login-box>
	</div>
</template>

<script>
	import LoginBox from '@/js/components/login-box';
	export default {
		name: 'login-view',
		components: {
			LoginBox
		}
	};
</script>

<style lang="scss" type="text/scss">
	.login-view {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color: white;
		z-index: 2;
		background: linear-gradient(to bottom, $primaryColour 0%, darken( $primaryColour, 15% ) 100%);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
