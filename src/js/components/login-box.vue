<template>
	<div class="login-box">
		<transition name="fade-up" mode="out-in">
			<render-form
				v-for="(schema, key, index) in loginSchema"
				v-if="$route.path === schema.route"
				:key="key"
				:schema="schema.build"
				:username="username"
				:email-address="emailAddress"
				:password="password"
				:verification="verification"
				:remember-me="rememberMe"
				@updateInput="handleUpdate"
				@submit="handleNext"
			></render-form>
		</transition>
		<next @next="handleNext"></next>
	</div>
</template>

<script>
	import {loginSchema} from '@/js/schema/login';
	import VueTypes from 'vue-types';
	import VerificationForm from '@/js/atomic/login/verification-form';
	import RenderForm from '@/js/atomic/login/render-form';
	import LoginForm from '@/js/atomic/login/login-form';
	import RegisterForm from '@/js/atomic/login/register-form';
	import ForgotPasswordResetForm from '@/js/atomic/login/forgot-password-reset-form';
	import Next from '@/js/atomic/login/next';
	import {mapActions, mapState} from 'vuex';
	export default {
		name: 'login-box',
		props: {
			registration: VueTypes.string.def('')
		},
		components: {
			VerificationForm,
			LoginForm,
			RegisterForm,
			ForgotPasswordResetForm,
			Next,
			RenderForm
		},
		data () {
			return {
				loginSchema,
				username: '',
				emailAddress: '',
				password: '',
				verification: '',
				rememberMe: false
			};
		},
		computed: {
			...mapState({
				state: state => state.user.state
			})
		},
		methods: {
			...mapActions([
				'USER_TRANSITION'
			]),
			handleUpdate ({dataKey, value}) {
				this[dataKey] = value;
			},
			handleNext () {
				const next = this.loginSchema[this.state].next;
				this.USER_TRANSITION({
					type: next.action,
					params: {
						path: next.completionPath,
						username: this.username,
						emailAddress: this.emailAddress,
						password: this.password,
						verification: this.verification,
						rememberMe: this.rememberMe
					}
				});
			}
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
		min-height: em(424);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		transition: all .5s;
		padding: em(32);
		&:hover {
			box-shadow: 0 0 20px 4px rgba(0,0,0,.1);
		}
	}
</style>
