<template>
	<ul class="itemlist">
		<!--v-if="items.length > 0 && index <= dripFeed"-->
		<swipe-to-reveal
			v-infinite-scroll="{
				root: 'scrolling-container',
				callback: observerCallback,
				lastElement: index === dripFeed
			}"
			v-for="(element, index) in items"
			:key="`${tab}-${element.title}-${index}`"
			:configuration="swipeToRevealConfig"
			:index="index"
			:data-index="index"
			:reset="wantlistConfirmation.state && wantlistConfirmation.value"
			:button-state="checkTitleAgainstWantlistTitle(element.title, true) ? 'remove' : 'add'"
			:disable="$route.params.id !== 'discogs' || wantlistState === 'unauthenticated'"
			@add="handleAdd"
			@remove="handleRemove"
			@onClick="handleView"
		>
			<item
				:title="element.title"
				:price="element.price"
				:item-url="element.itemUrl"
				:image-url="element.imageUrl"
				:end-time="element.endTime"
				:bids="element.bids"
				:postage="element.postage"
				:location="element.location"
				:country="element.country"
				:id="element.id"
				:wantlist-item="checkTitleAgainstWantlistTitle(element.title, true) && $route.params.id === 'discogs'"
				:disable="$route.params.id !== 'discogs' || wantlistState === 'unauthenticated'"
			></item>
		</swipe-to-reveal>
	</ul>
</template>

<script>
	import Item from '@/js/components/item';
	import SwipeToReveal from '@/js/components/swipe-to-reveal';
	import {mapState, mapActions, mapGetters} from 'vuex';
	import {lowerCaseAndReplaceSpace} from '@/js/filters/lowerCaseAndReplaceSpace';
	import {removePunctuation} from '@/js/filters/removePunctuation';
	export default {
		name: 'Itemlist',
		data () {
			return {
				dripFeed: 10
			};
		},
		components: {
			Item,
			SwipeToReveal
		},
		computed: {
			...mapState({
				tab: state => state.toggle.state,
				query: state => state.search.query,
				wantlistConfirmation: state => state.wantlist.confirmation,
				wantlist: state => state.wantlist.items,
				wantlistState: state => state.wantlist.state
			}),
			...mapGetters([
				'wantlistTitles'
			]),
			items () {
				return this.$store.getters.sortItems(this.tab);
			},
			swipeToRevealConfig () {
				return {
					boundary: 72,
					translateX: 72,
					buttons: [
						{
							states: {
								add: {
									emit: 'add',
									heading: 'Add to Wantlist',
									styles: {
										color: 'white',
										fontSize: '12px'
									}
								},
								remove: {
									emit: 'remove',
									heading: 'Remove from wantlist',
									styles: {
										color: 'white',
										fontSize: '12px'
									}
								}
							}
						}
					]
				};
			}
		},
		methods: {
			...mapActions([
				'WANTLIST_TRANSITION',
				'SEARCH_TRANSITION'
			]),
			checkTitleAgainstWantlistTitle (str, bool = false) {
				if (!this.wantlistTitles) {
					return false;
				}
				let test = this.wantlistTitles.filter(regex => {
					return str.search(regex) >= 0;
				});
				if (bool) {
					return test.length > 0;
				} else {
					return test[0];
				}
			},
			search (index) {
				this.SEARCH_TRANSITION({type: 'SEARCH_SELECTED'});
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: this.items[index].title}});
			},
			pushArtistRoute (artist) {
				const artistPath = lowerCaseAndReplaceSpace(removePunctuation(artist), '-');
				this.$router.push({
					name: `related-artists`,
					params: {
						id: artistPath
					}
				});
			},
			handleAdd (index) {
				this.WANTLIST_TRANSITION({
					type: 'ADD_TO_WANTLIST',
					params: {
						type: 'addToWantlist',
						keywords: this.items[index].title
					}
				});
			},
			handleRemove (index) {
				let title = this.items[index].title;
				let releaseId;
				const regex = this.checkTitleAgainstWantlistTitle(title);
				this.wantlist.forEach(el => {
					if (el.title.search(regex) >= 0) {
						title = el.title;
						releaseId = el.id;
					}
				});
				this.WANTLIST_TRANSITION({
					type: 'REMOVE_FROM_WANTLIST',
					params: {
						type: 'deleteFromWantlist',
						releaseId,
						title
					}
				});
			},
			handleView (index) {
				if (this.$route.params.id === 'related-artists') {
					this.pushArtistRoute(this.items[index].title);
					return;
				}
				let win = window.open(this.items[index].itemUrl, '_blank');
				win.focus();
			},
			observerCallback () {
				this.dripFeed = this.dripFeed + 10;
			}
		},
		watch: {
			query () {
				this.dripFeed = 10;
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.itemlist {

	}
</style>
