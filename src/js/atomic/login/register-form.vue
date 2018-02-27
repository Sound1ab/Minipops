<template>
	<form @submit.prevent="handleSubmit()">
		<login-input
			:title="'Username'"
			:value="username"
			:dataKey="'username'"
			@updateInput="handleUpdate"
		></login-input>
		<login-input
			:title="'Email Address'"
			:value="emailAddress"
			:dataKey="'emailAddress'"
			@updateInput="handleUpdate"
		></login-input>
		<login-input
			:title="'Password'"
			:type="'password'"
			:value="password"
			:dataKey="'password'"
			@updateInput="handleUpdate"
		></login-input>
		<navigate-form
			:to="'login'"
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
	import SubmitButton from '@/js/atomic/login/submit-button';
	export default {
		name: 'register-form',
		components: {
			LoginInput,
			RememberMe,
			NavigateForm,
			SubmitButton
		},
		props: {
			username: VueTypes.string.def(''),
			emailAddress: VueTypes.string.def(''),
			password: VueTypes.string.def('')
		},
		methods: {
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
