<template>
	<div class="login-box">
		<form>
			<login-input
				:title="'Username'"
			></login-input>
			<login-input
				:title="'Email Address'"
			></login-input>
			<login-input
				:title="'Password'"
				:type="'password'"
			></login-input>
			<registered></registered>
		</form>
		<next></next>
	</div>
</template>

<script>
	import LoginInput from '@/js/atomic/login/login-input';
	import RememberMe from '@/js/atomic/login/remember-me';
	import Registered from '@/js/atomic/login/registered';
	import Next from '@/js/atomic/login/next';
	export default {
		name: 'login-box',
		components: {
			LoginInput,
			RememberMe,
			Registered,
			Next
		}
	};
</script>

<style lang="scss" type="text/scss">
	.login-box {
		position: relative;
		background: white;
		box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
		width: 80%;
		max-width: em(320);
		height: 80%;
		max-height: em(400);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		transition: all .5s;
		padding: em(32);
		&:hover {
			box-shadow: 0 0 20px 4px rgba(0,0,0,.1);
		}
		&__input {
			background-color: transparent;
			width: 100%;
		}
		&__forgot-password {
			color: $tertiaryColour;
			font-size: 14px;
			margin-bottom: em(16);
		}
	}
</style>
