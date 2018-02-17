<template>
	<div class="sort" @click="handleIconClick">
		<filter-icon class="sort__button"></filter-icon>
		<transition name="fade" mode="out-in">
			<floating-menu
				v-if="show && ($route.params.id === 'current' || $route.params.id === 'completed')"
				:show="show"
				class="sort__menu"
			>
				<!--<h2 class="gamma">Filter options</h2>-->
				<ul class="sort__list">
					<li
						v-for="element in sortList"
						@click="handleFilterClick(element, $route.params.id)"
						class="sort__list-item"
						:class="{' sort__list-item--active': element === activeSort}"
					>
						{{element}}
					</li>
				</ul>
			</floating-menu>
		</transition>
	</div>

</template>

<script>
	import FilterIcon from '@/js/atomic/filter-icon';
	import FloatingMenu from '@/js/atomic/floating-menu';
	import {filterKeys} from '@/js/vuex/filter';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'sort',
		components: {
			FilterIcon,
			FloatingMenu
		},
		data () {
			return {
				show: false
			};
		},
		computed: {
			...mapState({
				sort: state => state.ui.sort,
				activeSort: state => state.search.sort
			}),
			sortList () {
				return [filterKeys.priceLowHigh, filterKeys.priceHighLow, filterKeys.endSoon];
			}
		},
		methods: {
			...mapActions([
				'TOGGLE_SORT',
				'SORT'
			]),
			handleIconClick () {
				this.show = !this.show;
			},
			handleFilterClick (sort) {
				this.SORT(sort);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	$height: 56px;
	.sort {
		float: right;
		display: inline-block;
		//box-shadow: -3px 2px 4px -2px rgba(0, 0, 0, 0.2);
		z-index: 2;
		position: relative;
		&__button {
			width: 100%;
			height: 100%;
			background-color: transparent;
		}
		&__menu {
			position: absolute;
			bottom: -8px;
			right: -8px;
			transform: translateY(100%);
		}
		&__list-item {
			margin-bottom: em(8);
			&:last-child {
				margin-bottom: 0;
			}
			&--active {
				color: $tertiaryColour;
			}
		}
	}
</style>
