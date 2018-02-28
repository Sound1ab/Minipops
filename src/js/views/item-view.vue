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
			onLoad () {
				let query;
				let routeEntering;
				if (this.$route.params.artist && this.$route.params.spotifyId) {
					const searchQuery = this.$route.params.artist.replace('-', ' ');
					query = this.$route.params.spotifyId;
					this.SEARCH_TRANSITION({type: 'UPDATE_SEARCH', params: {searchQuery}});
					routeEntering = 'artist-releases';
				} else {
					routeEntering = this.tab;
					query = this.$store.state.search.query;
				}
				if (!query) {
					return;
				}
				const routeEnteringQuery = this.$store.state.fetch[routeEntering].query;
				this.$store.dispatch('FETCH_TRANSITION', {
					type: 'FETCH_DATA_REQUEST',
					params: {
						query,
						routeEnteringQuery
					}
				});
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
