<template>
	<scrolling-container class="login-view">
		<img class="login-view__icon" :src="require('@/assets/images/recollect-icon-loading.png')" />
		<login-box class="login-view__login"></login-box>
	</scrolling-container>
</template>

<script>
	import LoginBox from '@/js/components/login-box';
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	export default {
		name: 'login-view',
		components: {
			LoginBox,
			ScrollingContainer
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
		//display: flex;
		//justify-content: center;
		//align-items: center;
		//flex-direction: column;
		&__icon {
			width: 144px;
			height: 144px;
			margin: em(16) auto;
		}
		&__login {
			margin: em(16) auto;
			margin-bottom: em(72);
		}
	}
</style>
