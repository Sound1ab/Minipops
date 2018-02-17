<template>
	<slide-up-down>
		<div class="average-price" v-if="averagePrice && tab === 'completed' && completedItems.length > 0">
			Average price: £{{averagePrice}}
		</div>
	</slide-up-down>
</template>

<script>
	import {mapState} from 'vuex';
	import SlideUpDown from '@/js/transitions/slide-up-down';
	export default {
		name: 'average-price',
		components: {
			SlideUpDown
		},
		computed: {
			...mapState({
				tab: state => state.toggle.state.buttonSelected,
				completedItems: state => state.search.completed.items
			}),
			averagePrice () {
				return this.$store.getters.averagePrice(this.tab);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.average-price {
		//background: $tertiaryColour;
		padding: em(8);
		text-align: center;
		color: white;
	}
</style>
