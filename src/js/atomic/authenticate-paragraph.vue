<template>
	<p v-if="authPref" class="authenticate-paragraph">
		To view your wantlist, please <span class="authenticate-paragraph__link" @click="handleAuthenticationRedirect">authenticate</span> the app
	</p>
</template>

<script>
//	import VueTypes from 'vue-types';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'authenticate-paragraph',
		methods: {
			...mapActions([
				'WANTLIST_TRANSITION'
			]),
			handleAuthenticationRedirect () {
				this.WANTLIST_TRANSITION({type: 'REAUTHENTICATE'});
			}
		},
		computed: {
			...mapState({
				authPref: state => state.wantlist.authPref
			})
		}
	};
</script>

<style lang="scss" type="text/scss">
	.authenticate-paragraph {
		color: white;
		padding: em(12) em(16);
		&__link {
			cursor: pointer;
			color: $tertiaryColour
		}
	}
</style>
