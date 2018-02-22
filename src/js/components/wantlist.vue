<template>
	<ul class="wantlist__list">
		<swipe-to-reveal
			v-for="(element, index) in items"
			:key="`${element.title}-${index}`"
			:configuration="swipeToRevealConfig"
			:index="index"
			:reset="wantlistConfirmation.state && wantlistConfirmation.value"
			:button-state="watchers.includes(element.title) ? 'removeWatch' : 'watch'"
			@remove="handleRemove"
			@watch="handleWatch"
			@removeWatch="handleRemoveWatcher"
			@onClick="handleClick"
		>
			<wantlist-item
				:title="element.title"
				:image-url="element.imageUrl"
				:id="element.id"
				:extra-info="element.extraInfo"
				:watching="watchers.includes(element.title)"
			></wantlist-item>
		</swipe-to-reveal>
	</ul>
</template>

<script>
	import SwipeToReveal from '@/js/components/swipe-to-reveal';
	import WantlistItem from '@/js/components/wantlist-item';
	import {mapState, mapActions} from 'vuex';
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
				subscribeId: state => state.watch.subscribeId,
				watchers: state => state.watch.watchers,
				wantlistConfirmation: state => state.wantlist.confirmation
			}),
			swipeToRevealConfig () {
				return {
					translateX: 144,
					boundary: 72,
					buttons: [
						{
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
						},
						{
							emit: 'remove',
							heading: 'Remove',
							styles: {
								color: 'white',
								fontSize: '12px'
							}
						}
					]
				};
			}
		},
		methods: {
			...mapActions([
				'SEARCH_TRANSITION',
				'WANTLIST_TRANSITION',
				'WATCH_TRANSITION'
			]),
			pushRelatedArtists (query) {
				this.SEARCH_TRANSITION({type: 'UPDATE_SEARCH', params: {query}});
				this.$router.push({
					path: `/related-artists`
				});
			},
			handleRemove (index) {
				this.WANTLIST_TRANSITION({
					type: 'REMOVE_FROM_WANTLIST',
					params: {
						type: 'deleteFromWantlist',
						releaseId: this.items[index].id,
						title: this.items[index].title
					}
				});
			},
			handleClick (index) {
				if (this.tab === 'artist-releases') {
					this.pushRelatedArtists(this.items[index].title);
					return;
				}
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: this.items[index].title}});
			},
			handleWatch (index) {
				this.WATCH_TRANSITION({
					type: 'WATCH',
					params: {
						title: this.items[index].title
					}
				});
			},
			handleRemoveWatcher (index) {
				this.WATCH_TRANSITION({
					type: 'REMOVE_WATCH',
					params: {
						title: this.items[index].title
					}
				});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.wantlist {

	}
</style>
