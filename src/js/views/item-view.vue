<template>
	<transition name="fade-up" mode="out-in">
		<div class="item-view" :key="tab" v-if="state !== 'fetchingData'">
			<average-price></average-price>
			<scrolling-container class="item-view__scrolling-container" id="scrolling-container">
					<itemlist></itemlist>
			</scrolling-container>
		</div>
	</transition>
</template>

<script>
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import Itemlist from '@/js/components/itemlist';
	import {mapState} from 'vuex';
	import AveragePrice from '@/js/components/average-price';
	export default {
		name: 'item-view',
		components: {
			ScrollingContainer,
			Itemlist,
			AveragePrice
		},
		computed: {
			...mapState({
				state: state => state.fetch.state,
				tab: state => state.toggle.state,
				query: state => state.search.query,
				user: state => state.user.user
			})
		},
		methods: {
			handleArtistReleasesRoute (spotifyId) {
				this.dispatchTransition(spotifyId);
			},
			handleAllOtherRoutes (query) {
				this.dispatchTransition(query);
			},
			dispatchTransition (query) {
				if (!query) {
					return;
				}
				this.$store.dispatch('FETCH_TRANSITION', {
					type: 'FETCH_DATA_REQUEST',
					params: {
						type: 'TAB_DISPATCH',
						query,
						tab: this.tab,
						user: this.user.idToken
					}
				});
			},
			onLoad () {
				const query = this.query;
				const spotifyId = this.$route.params.spotifyId;
				const tab = this.tab;
				if (tab === 'login') {
					return;
				}
				if (spotifyId) {
					this.handleArtistReleasesRoute(spotifyId);
				} else {
					this.handleAllOtherRoutes(query);
				}
			}
		},
		watch: {
			'$route': 'onLoad'
		},
		created () {
			this.onLoad();
		}
	};
</script>

<style lang="scss" type="text/scss">
	.item-view {
		position: relative;
		//top: -40px;
		//margin-bottom: -40px;
		//background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
		&__scrolling-container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
