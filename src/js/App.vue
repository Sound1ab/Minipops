<template>
	<div id="app">
		<side-bar></side-bar>
		<user-profile></user-profile>
		<span
			class="app-container"
			:class="{'app-container--menu-active': menu, 'app-container--profile-active': profile}"
		>
			<transition name="fade-half">
				<div class="app-container__background" v-if="menu || profile"></div>
			</transition>
			<heading-bar></heading-bar>
			<toggle></toggle>
			<!--<average-price></average-price>-->
			<search-overlay></search-overlay>
			<router-view class="router-view"/>
		</span>
		<loading></loading>
		<confirmation></confirmation>
		<authenticate-message></authenticate-message>
	</div>
</template>

<script>
	import store from './vuex/index';
	import HeadingBar from '@/js/components/heading-bar';
	import Toggle from '@/js/components/toggle';
	import Sort from '@/js/components/sort';
	import SearchOverlay from '@/js/components/search-overlay';
	import AveragePrice from '@/js/components/average-price';
	import SideBar from '@/js/components/side-bar';
	import UserProfile from '@/js/components/user-profile';
	import Loading from '@/js/components/loading';
	import Confirmation from '@/js/components/confirmation';
	import AuthenticateMessage from '@/js/components/authenticate-message';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'app',
		store,
		components: {
			HeadingBar,
			Toggle,
			Sort,
			AveragePrice,
			SideBar,
			UserProfile,
			Loading,
			Confirmation,
			AuthenticateMessage,
			SearchOverlay
		},
		computed: {
			...mapState({
				wantlist: state => state.wantlist,
				search: state => state.search,
				menu: state => state.ui.menu,
				profile: state => state.ui.profile,
				user: state => state.user.user,
				tab: state => state.toggle.state
			})
		},
		methods: {
			...mapActions([
				'WATCH_TRANSITION',
				'WANTLIST_TRANSITION',
				'USER_TRANSITION',
				'SUBSCRIPTION_TRANSITION'
			])
		},
		watch: {
			user: function (val) {
				if (typeof val.idToken === 'string') {
					this.SUBSCRIPTION_TRANSITION({type: 'LOADED', params: {user: val.idToken}});
					this.WATCH_TRANSITION({type: 'RETRIEVE_WATCHERS', params: {user: val.idToken}});
					this.WANTLIST_TRANSITION({type: 'FETCH_WANTLIST', params: {user: val.idToken}});
				}
			}
		},
		created () {
			this.USER_TRANSITION({type: 'LOADED'});
		}
	};
</script>

<style lang="scss">
	#app {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow: hidden;
	}
	.router-view {
		flex: 1 1 100%;
	}
	.app-container {
		z-index: 3;
		transform: translateX(0);
		height: 100%;
		width: 100%;
		background: linear-gradient(to bottom, lighten($primaryColour, 0%) 0%, lighten($primaryColour, 10%) 100%);
		transition: transform .5s;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		&--menu-active {
			transform: translateX(320px);
		}
		&--profile-active {
			transform: translateX(-320px);
		}
		&__background {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 3;
			background-color: black;
			opacity: 0.5;
		}
	}
</style>
