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
	import {mapState} from 'vuex';

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
			onLoad () {
				const query = this.$store.state.search.query;
				const routeEntering = this.$route.params.id;
				const routeEnteringQuery = this.$store.state.fetch[routeEntering].query;
				if (!query) {
					return;
				}
				this.$store.dispatch('FETCH_TRANSITION', {
					type: 'FETCH_DATA_REQUEST',
					extState: {
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
