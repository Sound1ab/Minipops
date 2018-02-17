<template>
		<div
			class="authenticate-message"
		>
			<transition name="fade-half">
				<div class="authenticate-message__background" v-if="show"></div>
			</transition>
			<transition name="fade-up" mode="out-in">
				<div class="authenticate-message__inner" v-if="show">
					<h2 class="gamma">Please authenticate 🗝</h2>
					<p>Please authorise this app with Discogs to unlock its full potential.</p>
					<p>Once authorised, vinyls can be saved to your wantlist, ebay notifications setup and related artists found!</p>
					<p class="authenticate-message__caveat">Psst... you can still use the app without authorisation, but only the search functionality. 🤓</p>
					<div>
						<button
							@click="handleAuthenticate"
							class="authenticate-message__button"
						>
							Yes
						</button>
						<button
							@click="handleDontAuthenticate"
							class="authenticate-message__button"
						>
							No
						</button>
					</div>
					<!--<div class="authenticate-message__key">🗝</div>-->
				</div>
			</transition>
		</div>
</template>

<script>
	import Vuetypes from 'vue-types';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'AuthenticateMessage',
		props: {
			showAuthenticateMessage: Vuetypes.bool.def(false)
		},
		computed: {
			...mapState({
				show: state => state.ui.authenticationMessage
			})
		},
		methods: {
			...mapActions([
				'WANTLIST_TRANSITION'
			]),
			handleAuthenticate () {
				this.WANTLIST_TRANSITION({type: 'AUTHENTICATE', params: {preference: true}});
			},
			handleDontAuthenticate () {
				this.WANTLIST_TRANSITION({type: 'DONT_AUTHENTICATE', params: {preference: false}});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.authenticate-message {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		pointer-events: none;
		&__button {
			margin-top: em(20);
			border-radius: 25px;
			padding: em(8) 0;
			width: em(64);
			background-color: $tertiaryColour;
			color: white;
		}
		&__inner {
			width: 80%;
			max-width: em(400);
			background-color: white;
			padding: em(24);
			border-radius: 25px;
			pointer-events: all;
			z-index: 3;
		}
		&__background {
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 3;
			background-color: black;
			opacity: 0.5;
		}
		&__caveat {
			font-size: 14px;
		}
		&__key {
			margin-top: em(16);
		}
	}
</style>
