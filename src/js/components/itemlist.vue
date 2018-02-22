<template>
	<ul class="itemlist">
		<!--v-if="items.length > 0 && index <= dripFeed"-->
		<large-item
			v-for="(element, index) in items"
			:key="`${tab}-${element.title}-${index}`"
			:data-index="index"
			:title="element.title"
			:secondary-title="element.secondaryTitle"
			:price="element.price"
			:item-url="element.itemUrl"
			:image-url="element.imageUrl"
			:end-time="element.endTime"
			:bids="element.bids"
			:postage="element.postage"
			:location="element.location"
			:country="element.country"
			:id="element.id"
			:index="index"
			:wantlist-item="checkTitleAgainstWantlistTitle(element.title, true)"
			:primary="element.primary"
			@add="handleAdd"
			@remove="handleRemove"
			@view="handleView"
		></large-item>
		<!--<swipe-to-reveal-->
			<!--v-infinite-scroll="{-->
				<!--root: 'scrolling-container',-->
				<!--callback: observerCallback,-->
				<!--lastElement: index === dripFeed-->
			<!--}"-->
			<!--v-for="(element, index) in items"-->
			<!--:key="`${tab}-${element.title}-${index}`"-->
			<!--:configuration="swipeToRevealConfig"-->
			<!--:index="index"-->
			<!--:data-index="index"-->
			<!--:reset="wantlistConfirmation.state && wantlistConfirmation.value"-->
			<!--:button-state="checkTitleAgainstWantlistTitle(element.title, true) ? 'remove' : 'add'"-->
			<!--:disable="$route.params.id !== 'discogs' || wantlistState === 'unauthenticated'"-->
			<!--@add="handleAdd"-->
			<!--@remove="handleRemove"-->
			<!--@onClick="handleView"-->
		<!--&gt;-->
			<!--<item-->
				<!--:title="element.title"-->
				<!--:price="element.price"-->
				<!--:item-url="element.itemUrl"-->
				<!--:image-url="element.imageUrl"-->
				<!--:end-time="element.endTime"-->
				<!--:bids="element.bids"-->
				<!--:postage="element.postage"-->
				<!--:location="element.location"-->
				<!--:country="element.country"-->
				<!--:id="element.id"-->
				<!--:wantlist-item="checkTitleAgainstWantlistTitle(element.title, true) && $route.params.id === 'discogs'"-->
				<!--:disable="$route.params.id !== 'discogs' || wantlistState === 'unauthenticated'"-->
			<!--&gt;</item>-->
		<!--</swipe-to-reveal>-->
	</ul>
</template>

<script>
	import Item from '@/js/components/item';
	import LargeItem from '@/js/components/large-item';
	import SwipeToReveal from '@/js/components/swipe-to-reveal';
	import {mapState, mapActions, mapGetters} from 'vuex';
	import {lowerCaseAndReplaceSpace} from '@/js/filters/lowerCaseAndReplaceSpace';
	import {removePunctuation} from '@/js/filters/removePunctuation';
	export default {
		name: 'Itemlist',
		components: {
			Item,
			LargeItem,
			SwipeToReveal
		},
		data () {
			return {
				dripFeed: 10
			};
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
				'wantlistTitles',
				'cleanItems',
				'sortItems'
			]),
			items () {
				if (this.tab === 'current' || this.tab === 'completed') {
					return this.sortItems;
				} else {
					return this.cleanItems;
				}
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
				'SEARCH_TRANSITION',
				'UPDATE_TOGGLE_STATE'
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
			pushArtistRoute (artist, spotifyId) {
				const artistPath = lowerCaseAndReplaceSpace(removePunctuation(artist), '-');
				this.$router.push({
					name: 'artist-releases',
					params: {
						artist: artistPath,
						spotifyId
					}
				});
			},
			pushDiscogs (query) {
				this.SEARCH_TRANSITION({type: 'UPDATE_SEARCH', params: {query}});
				this.$router.push({
					path: `/discogs`
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
				if (this.tab === 'related-artists') {
					this.pushArtistRoute(this.items[index].title, this.items[index].spotifyId);
					return;
				} else if (this.tab === 'artist-releases') {
					const query = `${this.items[index].title} ${this.items[index].secondaryTitle}`;
					this.pushDiscogs(query);
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
		padding: em(8);
	}
</style>
