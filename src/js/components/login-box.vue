<template>
	<div class="login-box">
		<transition name="fade-up" mode="out-in">
			<login-form
				v-if="$route.path === '/login'"
				:key="'login'"
				:username="username"
				:password="password"
				@handleNavigate="handleNavigate"
				@updateInput="handleUpdate"
				@submit="handleNext"
			></login-form>
			<register-form
				v-else-if="$route.path === '/login/registration'"
				:key="'register'"
				:username="username"
				:email-address="emailAddress"
				:password="password"
				@handleNavigate="handleNavigate"
				@updateInput="handleUpdate"
				@submit="handleNext"
			></register-form>
			<verification-form
				v-if="$route.path === '/login/verification'"
				:verification="verification"
				@handleNavigate="handleNavigate"
				@updateInput="handleUpdate"
				@submit="handleNext"
			></verification-form>
		</transition>
		<next @next="handleNext"></next>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import VerificationForm from '@/js/atomic/login/verification-form';
	import LoginForm from '@/js/atomic/login/login-form';
	import RegisterForm from '@/js/atomic/login/register-form';
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
			Next
		},
		data () {
			return {
				username: '',
				emailAddress: '',
				password: '',
				verification: ''
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
			loginUser (path) {
				this.USER_TRANSITION({
					type: 'LOGIN',
					params: {
						path,
						username: this.username,
						password: this.password
					}
				});
			},
			registerUser (path) {
				this.USER_TRANSITION({
					type: 'REGISTER_USER',
					params: {
						path,
						username: this.username,
						emailAddress: this.emailAddress,
						password: this.password
					}
				});
			},
			verifyUser (path) {
				this.USER_TRANSITION({
					type: 'VERIFY',
					params: {
						path,
						username: this.username,
						verification: this.verification
					}
				});
			},
			handleUpdate ({dataKey, value}) {
				this[dataKey] = value;
			},
			handleNavigate (path) {
				if (path === '/login') {
					this.loginUser(path);
				} else if (path === '/login/registration') {
					this.registerUser(path);
				} else if (path === '/login/verification') {
					this.verifyUser(path);
				}
			},
			handleNext () {
				if (this.state === 'waitingForLogin') {
					this.loginUser();
				} else if (this.state === 'waitingForRegistration') {
					this.registerUser();
				} else if (this.state === 'waitingForVerification') {
					this.verifyUser();
				}
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
		height: 80%;
		max-height: em(400);
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
