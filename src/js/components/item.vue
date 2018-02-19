<template>
	<div
		class="item"
		:class="{'item--watching': wantlistItem}"
	>
		<background-image class="item__background-image" :image="imageUrl"></background-image>
		<div class="item__copy-outer">
			<h1 class="item__heading delta">{{title}}</h1>
			<span class="item__time" v-if="endTime">{{endTime}}</span>
			<span class="item__bids" v-if="bids">bids {{bids}}</span>
			<span class="item__postage" v-if="postage">postage £{{postage | removeCurrency}}</span>
		</div>
		<div class="item__price-outer">
			<svgicon
				v-if="!disable"
				name="drag-vertical"
				:color="'#E24347'"
				width="30"
				height="30"
			>
			</svgicon>
			<span v-if="price" class="item__price">£{{price | removeCurrency}}</span>
		</div>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import BackgroundImage from '@/js/atomic/background-image';
	import '@/assets/compiled-icons/drag-vertical';
	export default {
		name: 'Item',
		components: {
			BackgroundImage
		},
		props: {
			title: VueTypes.string.def(''),
			price: VueTypes.string.def(''),
			itemUrl: VueTypes.string.def(''),
			imageUrl: VueTypes.string.def(''),
			endTime: VueTypes.string.def(''),
			bids: VueTypes.string.def(''),
			postage: VueTypes.string.def(''),
			country: VueTypes.string.def(''),
			location: VueTypes.string.def(''),
			id: VueTypes.number.def(0),
			wantlistItem: VueTypes.bool.def(false),
			disable: VueTypes.bool.def(false)
		},
		filters: {
			removeCurrency (val) {
				return val.replace('£', '');
			},
			truncate (val) {
				return val.substring(0, 10);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.item {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		padding: em(8);
		height: em(104);
		z-index: 1;
		background: white;
		border-bottom: 1px solid lightgray;
		&--watching {
			box-shadow: inset -4px 0px 0px 0px $tertiaryColour;
		}
		&__background-image {
			flex: 0 0 96px;
			height: 100%;
			margin-right: em(16);
		}
		&__copy-outer {
			flex: 2 1 auto;
			margin-right: em(8);
			position: relative;
			overflow: hidden;
		}
		&__heading {
			font-size: 16px;
			font-weight: bold;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		&__price-outer {
			position: relative;
			flex: 0 0 auto;
		}
		&__price {
			position: absolute;
			bottom: 0;
			right: 0;
		}
		&__time {
			display: block;
		}
		&__bids {
			display: block;
			color: #545454;
		}
		&__postage {
			display: block;
			color: #959595;
			font-size: 14px;
		}
	}
</style>
