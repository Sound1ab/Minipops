<template>
	<div class="navigate-form">
		<span class="navigate-form__outer" v-if="$route.path === '/login'">
			<hr class="navigate-form__border"/>
			<p class="navigate-form__copy">Not yet registered?</p>
			<p
				@click="handleClick('/login/registration')"
				class="navigate-form__link"
			>
				Create an account
			</p>
		</span>
		<span class="navigate-form__outer" v-else-if="$route.path === '/login/registration'">
			<p class="navigate-form__copy">Already registered?</p>
			<span>
				<p
					@click="handleClick('/login')"
					class="navigate-form__link"
				>
					Login
				</p>
					or
				<p
					@click="handleClick('/login/verification')"
					class="navigate-form__link"
				>
					Verify
				</p>
			</span>
		</span>
		<span class="navigate-form__outer" v-else-if="$route.path === '/login/verification'">
			<hr class="navigate-form__border"/>
			<span>
				<p
					@click="handleClick('/login')"
					class="navigate-form__link"
				>
					Login
				</p>
					or
				<p
					@click="handleClick('/login/registration')"
					class="navigate-form__link"
				>
					Create an account
				</p>
			</span>
		</span>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'navigate-form',
		props: {
			to: VueTypes.string.def('register')
		},
		methods: {
			handleClick (path) {
				this.$emit('handleNavigate', path);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.navigate-form {
		color: grey;
		&__outer {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
		&__border {
			margin: 16px;
			width: 60%;
			color: #eaeaea;
		}
		&__copy {
			color: grey;
			font-size: 14px;
			margin-bottom: em(8);
		}
		&__link {
			display: inline;
			color: $tertiaryColour;
			cursor: pointer;
		}
	}
</style>
