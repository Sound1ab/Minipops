<template>
	<div
		:key="tab"
		v-if="averagePrice && tab !== 'discovery' && tab !== 'artist-releases'"
		class="average-price"
		:class="{'average-price--move': move}"
	>
		<tooltip
			class="average-price__tooltip"
			v-if="tooltip"
			:nudge="'46px'"
			:size="'16px'"
			:trianglePosition="'bottom'"
		>
			<span>Average price</span>
		</tooltip>
		<div
			class="average-price__inner"
			@mouseleave="tooltip = false"
			@mouseover="tooltip = true"
			@click="move = !move"
		>
			<h2 class="average-price__heading delta">£{{averagePrice}}</h2>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters} from 'vuex';
	import SlideUpDown from '@/js/transitions/slide-up-down';
	import Tooltip from '@/js/atomic/tooltip';
	export default {
		name: 'average-price',
		components: {
			SlideUpDown,
			Tooltip
		},
		data () {
			return {
				tooltip: false,
				move: false
			};
		},
		computed: {
			...mapState({
				tab: state => state.toggle.state,
				completedItems: state => state.fetch.completed.items
			}),
			...mapGetters([
				'averagePrice'
			])
		},
		methods: {
			handleClick () {
				this.tooltip = !this.tooltip;
			},
			handleHover () {
				this.tooltip = !this.tooltip;
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.average-price {
		opacity: 1;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 2;
		margin: em(16);
		transition: bottom .5s;
		&--move {
			bottom: em(94);
		}
		&__tooltip {
			position: absolute!important;
			width: em(180);
			bottom: 100%;
			right: 0px;
			//transform: translateY(-116%);
		}
		&__inner {
			width: em(88);
			height: em(88);
			background-color: $primaryColour;
			color: $tertiaryColour;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			cursor: pointer;
			box-shadow: 0 0 20px 4px rgba(0,0,0,.2);
		}
		&__heading {
			margin: 0;
			pointer-events: none;
		}
	}
</style>
