<template>
	<div
		class="sort"
		@click="handleIconClick"
	>
		<filter-icon
			class="sort__button"
			:disabled="disabled"
		></filter-icon>
			<tooltip
				:nudge="'56px'"
				:size="'16px'"
				class="sort__menu"
				v-if="show && !disabled"
			>
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
			</tooltip>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import FilterIcon from '@/js/atomic/filter-icon';
	import FloatingMenu from '@/js/atomic/floating-menu';
	import Tooltip from '@/js/atomic/tooltip';
	import {filterKeys} from '@/js/vuex/filter';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'sort',
		components: {
			FilterIcon,
			FloatingMenu,
			Tooltip
		},
		props: {
			disabled: VueTypes.bool.def(false)
		},
		data () {
			return {
				show: false
			};
		},
		computed: {
			...mapState({
				sort: state => state.ui.sort,
				activeSort: state => state.fetch.sort
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
				if (this.disabled) {
					return;
				}
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
			position: absolute!important;
			width: em(180);
			top: 100%;
			right: 0;
		}
		&__list-item {
			margin-bottom: em(8);
			cursor: pointer;
			&:last-child {
				margin-bottom: 0;
			}
			&--active {
				color: darken($tertiaryColour, 30%);
			}
		}
	}
</style>
