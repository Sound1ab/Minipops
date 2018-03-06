<template>
	<ul class="itemlist">
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
			:country="element.country"
			:spotify-id="element.spotifyId"
			:index="index"
			:primary="element.primary"
			@add="handleAdd"
			@remove="handleRemove"
			@view="handleView"
		></large-item>
	</ul>
</template>

<script>
	import Item from '@/js/components/item';
	import LargeItem from '@/js/components/large-item';
	import SwipeToReveal from '@/js/components/swipe-to-reveal';
	import {mapState, mapActions, mapGetters} from 'vuex';
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
				user: state => state.user.user.idToken,
				tab: state => state.toggle.state,
				query: state => state.search.query
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
			title (index) {
				return `${this.items[index].title} ${this.items[index].secondaryTitle ? this.items[index].secondaryTitle : ''}`.trim();
			},
			search (index) {
				this.SEARCH_TRANSITION({type: 'SEARCH_SELECTED'});
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: this.title(index)}});
			},
			handleAdd ({artist, album, spotifyId, imageUrl}) {
				this.WANTLIST_TRANSITION({
					type: 'ADD_TO_WANTLIST',
					params: {
						type: 'addToWantlist',
						user: this.user,
						artist,
						album,
						spotifyId,
						imageUrl
					}
				});
			},
			handleRemove ({artist, album, spotifyId, imageUrl}) {
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
			},
			handleView (index) {
				if (this.tab === 'discovery') {
					this.pushArtistRoute(this.title(index), this.items[index].spotifyId);
					return;
				}
				let win = window.open(this.items[index].itemUrl, '_blank');
				win.focus();
			},
			pushArtistRoute (artist, spotifyId) {
				const encodeArtistPath = encodeURIComponent(artist);
				this.$router.push({
					name: 'artist-releases',
					params: {
						artist: encodeArtistPath,
						spotifyId
					}
				});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.itemlist {
		padding: em(8);
	}
</style>
