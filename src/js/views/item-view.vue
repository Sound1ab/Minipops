<template>
	<scrolling-container class="item-view" id="scrolling-container">
		<transition name="fade-up" mode="out-in">
			<itemlist :key="tab" v-if="state !== 'fetchingData'"></itemlist>
		</transition>
	</scrolling-container>
</template>

<script>
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import Itemlist from '@/js/components/itemlist';
	import {mapState, mapActions} from 'vuex';

	export default {
		name: 'item-view',
		components: {
			ScrollingContainer,
			Itemlist
		},
		computed: {
			...mapState({
				state: state => state.fetch.state,
				tab: state => state.toggle.state
			})
		},
		methods: {
			...mapActions([
				'SEARCH_TRANSITION'
			]),
			replaceHyphensWithSpaces (str) {
				return str.replace('-', ' ');
			},
			retrieveRouteEnteringQuery (routeEntering) {
				return this.$store.state.fetch[routeEntering].query;
			},
			handleArtistReleasesRoute (artist, spotifyId) {
				const searchQuery = this.replaceHyphensWithSpaces(artist);
				const query = spotifyId;
				const routeEnteringQuery = this.retrieveRouteEnteringQuery('artist-releases');
				this.SEARCH_TRANSITION({type: 'UPDATE_SEARCH', params: {query: searchQuery}});
				this.dispatchTransition(query, routeEnteringQuery);
			},
			handleAllOtherRoutes (query, tab) {
				const routeEnteringQuery = this.retrieveRouteEnteringQuery(tab);
				this.dispatchTransition(query, routeEnteringQuery);
			},
			dispatchTransition (query, routeEnteringQuery) {
				if (!query) {
					return;
				}
				this.$store.dispatch('FETCH_TRANSITION', {
					type: 'FETCH_DATA_REQUEST',
					params: {
						query,
						routeEnteringQuery
					}
				});
			},
			onLoad () {
				const query = this.$store.state.search.query;
				const artist = this.$route.params.artist;
				const spotifyId = this.$route.params.spotifyId;
				const tab = this.tab;
				if (tab === 'login') {
					return;
				}
				if (artist && spotifyId) {
					this.handleArtistReleasesRoute(artist, spotifyId);
				} else {
					this.handleAllOtherRoutes(query, tab);
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
		background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
	}
</style>
