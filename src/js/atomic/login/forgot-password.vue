<template>
	<p @click="handleClick" class="forgot-password">Forgot Password?</p>
</template>

<script>
	import {mapActions} from 'vuex';
	export default {
		name: 'forgot-password',
		methods: {
			...mapActions([
				'USER_TRANSITION'
			]),
			handleClick () {
				this.USER_TRANSITION({type: 'FORGOT_PASSWORD'});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.forgot-password {
		color: $tertiaryColour;
		font-size: 14px;
		margin-bottom: em(16);
		cursor: pointer;
	}
</style>
