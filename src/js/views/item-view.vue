<template>
	<scrolling-container class="item-view" id="scrolling-container">
		<itemlist v-if="!(state['fetchingData'] === 'request')"></itemlist>
	</scrolling-container>
</template>

<script>
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import Itemlist from '@/js/components/itemlist';
	import Store from '@/js/vuex/index';
	import {mapState} from 'vuex';
	export default {
		name: 'item-view',
		components: {
			ScrollingContainer,
			Itemlist
		},
		beforeRouteEnter (to, from, next) {
			const query = Store.state.search.query;
			const routeEntering = to.params.id;
			const routeEnteringQuery = Store.state.search[routeEntering].query;
			if (!query) {
				next();
				return;
			}
			Store.dispatch('SEARCH_TRANSITION', {
				type: 'TAB_UPDATED',
				params: {
					query,
					routeEnteringQuery
				},
				callback: () => {
					next();
				}
			});
		},
		beforeRouteUpdate (to, from, next) {
			const query = this.$store.state.search.query;
			const routeEntering = to.params.id;
			const routeEnteringQuery = this.$store.state.search[routeEntering].query;
			this.$store.dispatch('SEARCH_TRANSITION', {
				type: 'TAB_UPDATED',
				params: {
					query,
					routeEnteringQuery
				},
				callback: () => {
					next();
				}
			});
		},
		computed: {
			...mapState({
				state: state => state.search.state
			})
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
