<template>
	<div id="app">
		<side-bar></side-bar>
		<span
			class="app-container"
			:class="{'app-container--menu-active': open}"
		>
			<transition name="fade-half">
				<div class="app-container__background" v-if="open"></div>
			</transition>
			<heading-bar></heading-bar>
			<toggle></toggle>
			<average-price></average-price>
			<!--<transition name="fade-up" mode="out-in">-->
				<router-view class="router-view"/>
			<!--</transition>-->
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
	import AveragePrice from '@/js/components/average-price';
	import SideBar from '@/js/components/side-bar';
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
			Loading,
			Confirmation,
			AuthenticateMessage
		},
		computed: {
			...mapState({
				wantlist: state => state.wantlist,
				search: state => state.search,
				open: state => state.ui.menu,
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
				if (typeof val === 'string') {
					this.SUBSCRIPTION_TRANSITION({type: 'LOADED', params: {user: val}});
					this.WATCH_TRANSITION({type: 'RETRIEVE_WATCHERS', params: {user: val}});
					this.WANTLIST_TRANSITION({type: 'FETCH_WANTLIST', params: {user: val}});
				}
			},
			open: function open (val) {
				if (!open.invoked && val) {
					open.invoked = true;
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
		z-index: 1;
		transform: translateX(0);
		height: 100%;
		width: 100%;
		background: linear-gradient(to bottom, $primaryColour 0%, darken($primaryColour, 30%) 100%);
		transition: transform .5s;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		&--menu-active {
			transform: translateX(320px);
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
