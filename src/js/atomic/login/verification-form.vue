<template>
	<form @submit.prevent="handleSubmit()" class="verification">
		<login-input
			:title="'Verification'"
			:value="verification"
			:dataKey="'verification'"
			@updateInput="handleUpdate"
		></login-input>
		<p class="verification__copy">You will receive a verification code via the email provided. Please enter it above to continue.</p>
		<navigate-form
			@handleNavigate="handleNavigate"
		></navigate-form>
		<submit-button></submit-button>
	</form>
</template>

<script>
	import VueTypes from 'vue-types';
	import LoginInput from '@/js/atomic/login/login-input';
	import NavigateForm from '@/js/atomic/login/navigate-form';
	import SubmitButton from '@/js/atomic/login/submit-button';
	export default {
		name: 'login-form',
		components: {
			LoginInput,
			NavigateForm,
			SubmitButton
		},
		props: {
			verification: VueTypes.string.def('')
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

<style lang="scss" type="text/scss">
	.verification {
		&__copy {
			color: grey;
		}
	}
</style>
