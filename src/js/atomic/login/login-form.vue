<template>
	<form @submit.prevent="handleSubmit()">
		<login-input
			:title="'Username'"
			:value="username"
			:dataKey="'username'"
			@updateInput="handleUpdate"
		></login-input>
		<login-input
			:title="'Password'"
			:value="password"
			:dataKey="'password'"
			:type="'password'"
			@updateInput="handleUpdate"
		></login-input>
		<forgot-password
			@handleClick="handleForgotPasswordClick"
		></forgot-password>
		<remember-me
			:data-key="'rememberMe'"
			:value="rememberMe"
			@checkboxUpdate="handleUpdate"
		></remember-me>
		<navigate-form
			:schema="navigateSchema"
			@handleNavigate="handleNavigate"
		></navigate-form>
		<submit-button></submit-button>
	</form>
</template>

<script>
	import VueTypes from 'vue-types';
	import LoginInput from '@/js/atomic/login/login-input';
	import RememberMe from '@/js/atomic/login/remember-me';
	import NavigateForm from '@/js/atomic/login/navigate-form';
	import ForgotPassword from '@/js/atomic/login/forgot-password';
	import SubmitButton from '@/js/atomic/login/submit-button';
	export default {
		name: 'login-form',
		components: {
			LoginInput,
			RememberMe,
			NavigateForm,
			ForgotPassword,
			SubmitButton
		},
		props: {
			username: VueTypes.string.def(''),
			password: VueTypes.string.def(''),
			rememberMe: VueTypes.bool.def(false)
		},
		computed: {
			navigateSchema () {
				return {
					border: true,
					heading: 'Not yet registered?',
					children: [
						{
							onClick: 'REGISTER_USER',
							copy: 'Create an account'
						},
						{
							onClick: 'LOGIN',
							copy: 'Login'
						}
					]
				};
			}
		},
		methods: {
			handleForgotPasswordClick () {
				this.$emit('handleForgotPasswordClick');
			},
			handleNavigate (path) {
				this.$emit('handleNavigate', path);
			},
			handleUpdate ({dataKey, value}) {
				this.$emit('updateInput', {dataKey, value});
			},
			handleSubmit () {
				this.$emit('submit');
			}
		}
	};
</script>
