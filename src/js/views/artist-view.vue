<template>
	<scrolling-container class="artist-view" id="scrolling-container">
		<transition name="fade-up" mode="out-in">
			<artist v-if="state !== 'fetchingArtistData'" :key="artistInfo.name"></artist>
		</transition>
	</scrolling-container>
</template>

<script>
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import Artist from '@/js/components/artist';
	import {mapState} from 'vuex';

	export default {
		name: 'artist-view',
		components: {
			Artist,
			ScrollingContainer
		},
		computed: {
			...mapState({
				artistInfo: state => state.artist.artistInfo,
				state: state => state.artist.state
			}),
			members () {
				if (!this.artistInfo.members) {
					return;
				}
				return this.artistInfo.members.map(el => `${el.name} ${el.active ? '- active' : ''}`);
			}
		},
		methods: {
			onLoad () {
//				let query;
//				if (!this.$route.params.id) {
//					query = this.$store.state.search.query || '';
//				} else {
//					query = this.$route.params.id.replace(/-/g, ' ');
//				}
				let artist = this.$route.params.artist;
				let query = decodeURIComponent(artist);
				console.log(query);
				if (!query) {
					return;
				}
				this.$store.dispatch('ARTIST_TRANSITION', {
					type: 'LOADED',
					params: {
						query
					}
				});
			}
		},
		created () {
			if (!this.$store.state.user || !this.$store.state.user.user.idToken) {
				this.$store.watch(
					function (state) {
						return state.user.user.idToken;
					},
					this.onLoad,
					{
						deep: true
					}
				);
				return;
			}
			this.onLoad();
		}
	};
</script>

<style lang="scss" type="text/scss">
	.artist-view {
		position: relative;
		background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
		&__title {
			padding: em(8);
			position: absolute;
			bottom: 0;
		}
		&__banner {
			position: relative;
			width: 100%;
			height: calc((100vw / 2));
			max-height: em(480);
			min-height: em(220);
		}
	}
</style>
