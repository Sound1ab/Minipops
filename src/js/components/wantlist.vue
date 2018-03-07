<template>
	<ul class="wantlist__list">
		<swipe-to-reveal
			v-for="(element, index) in items"
			:key="`${element.artist}-${index}`"
			:configuration="swipeToRevealConfig"
			:index="index"
			:reset="confirmationMessage.state && confirmationMessage.value"
			:button-state="watchers.length > 0 && watchers.includes(element.spotifyId) ? 'removeWatch' : 'watch'"
			@remove="handleRemove"
			@watch="handleWatch"
			@removeWatch="handleRemoveWatcher"
			@onClick="handleClick"
		>
			<wantlist-item
				:artist="element.artist"
				:album="element.album"
				:spotify-id="element.spotifyId"
				:image-url="element.imageUrl"
				:watching="watchers.length > 0 && watchers.includes(element.spotifyId)"
			></wantlist-item>
		</swipe-to-reveal>
	</ul>
</template>

<script>
	import SwipeToReveal from '@/js/components/swipe-to-reveal';
	import WantlistItem from '@/js/components/wantlist-item';
	import {mapState, mapActions, mapGetters} from 'vuex';
	export default {
		name: 'wantlist',
		components: {
			SwipeToReveal,
			WantlistItem
		},
		computed: {
			...mapState({
				tab: state => state.toggle.state,
				items: state => state.wantlist.items,
				user: state => state.user.user.idToken,
				watchers: state => state.watch.watchers,
				confirmationMessage: state => state.ui.confirmation
			}),
			...mapGetters([
				'wantlistIds',
				'subscriptionReady'
			]),
			swipeToRevealConfig () {
				const watch = this.subscriptionReady ? {
					states: {
						watch: {
							emit: 'watch',
							heading: 'Watch eBay items',
							styles: {
								color: 'white',
								fontSize: '12px'
							}
						},
						removeWatch: {
							emit: 'removeWatch',
							heading: 'Remove watcher',
							styles: {
								color: 'white',
								fontSize: '12px'
							}
						}
					}
				} : null;
				const remove = {
					emit: 'remove',
					heading: 'Remove',
					styles: {
						color: 'white',
						fontSize: '12px'
					}
				};
				const buttons = [watch, remove].filter(el => el);
				return {
					translateX: buttons.length > 1 ? 144 : 72,
					boundary: 72,
					buttons
				};
			}
		},
		methods: {
			...mapActions([
				'SEARCH_TRANSITION',
				'WANTLIST_TRANSITION',
				'WATCH_TRANSITION'
			]),
			handleRemove (index) {
				const {artist, album, spotifyId, imageUrl} = this.items[index];
				this.WANTLIST_TRANSITION({
					type: 'DELETE_FROM_WANTLIST',
					params: {
						type: 'deleteFromWantlist',
						user: this.user,
						artist,
						album,
						spotifyId,
						imageUrl
					}
				});
				if (this.wantlistIds.includes(spotifyId)) {
					this.handleRemoveWatcher(index);
				}
			},
			handleClick (index) {
				const {artist, album} = this.items[index];
				const query = `${artist} ${album}`;
				this.SEARCH_TRANSITION({
					type: 'TEXT_INPUT',
					params: {
						type: 'WANTLIST_DISPATCH',
						query,
						tab: this.tab,
						user: this.user
					}
				});
			},
			handleWatch (index) {
				const {album, artist, spotifyId} = this.items[index];
				const keywords = `${artist} ${album}`;
				this.WATCH_TRANSITION({
					type: 'WATCH',
					params: {
						user: this.user,
						keywords,
						spotifyId
					}
				});
			},
			handleRemoveWatcher (index) {
				const {album, artist, spotifyId} = this.items[index];
				const keywords = `${artist} ${album}`;
				this.WATCH_TRANSITION({
					type: 'REMOVE_WATCH',
					params: {
						user: this.user,
						keywords,
						spotifyId
					}
				});
			}
		}
	};
</script>
