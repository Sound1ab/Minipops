<template>
	<li class="large-item">
		<div
			class="large-item__outer"
			v-infinite-scroll="{
				root: 'scrolling-container',
				callback: observerCallback,
				lastElement: true
			}"
			@click="handleView"
		>
		<transition name="fade-up">
			<div
				class="large-item__inner"
				:class="{'large-item__inner--primary': primary}"
				v-if="show"
			>
				<favourite
					v-if="tab === 'discogs' || tab === 'artist-releases'"
					:state="wantlistItem"
					@add="handleAdd"
					@remove="handleRemove"
				></favourite>
				<star
					v-if="primary">
				</star>
				<background-image
					class="large-item__background-image"
					:image="imageUrl"
				></background-image>
				<div class="large-item__copy-outer">
					<h1 class="large-item__heading delta">{{title}}</h1>
					<span class="large-item__time" v-if="secondaryTitle">{{secondaryTitle}}</span>
					<span class="large-item__time" v-if="endTime">{{endTime}}</span>
					<span class="large-item__bids" v-if="bids">bids {{bids}}</span>
					<span class="large-item__postage" v-if="postage">postage £{{postage | removeCurrency}}</span>
					<div class="large-item__price-outer">
						<span v-if="price" class="large-item__price">£{{price | removeCurrency}}</span>
					</div>
				</div>
			</div>
		</transition>
		</div>
	</li>
</template>

<script>
	import VueTypes from 'vue-types';
	import BackgroundImage from '@/js/atomic/background-image';
	import Favourite from '@/js/atomic/favourite';
	import Star from '@/js/atomic/star';
	import {mapState} from 'vuex';
	export default {
		name: 'large-item',
		components: {
			BackgroundImage,
			Favourite,
			Star
		},
		props: {
			title: VueTypes.string.def(''),
			secondaryTitle: VueTypes.string.def(''),
			price: VueTypes.string.def(''),
			itemUrl: VueTypes.string.def(''),
			imageUrl: VueTypes.string.def(''),
			endTime: VueTypes.string.def(''),
			bids: VueTypes.string.def(''),
			postage: VueTypes.string.def(''),
			country: VueTypes.string.def(''),
			location: VueTypes.string.def(''),
			id: VueTypes.number.def(0),
			index: VueTypes.number.def(0),
			wantlistItem: VueTypes.bool.def(false),
			disable: VueTypes.bool.def(false),
			primary: VueTypes.bool.def(false)
		},
		data () {
			return {
				show: false
			};
		},
		computed: {
			...mapState({
				tab: state => state.toggle.state
			})
		},
		filters: {
			removeCurrency (val) {
				return val.replace('£', '');
			},
			truncate (val) {
				return val.substring(0, 10);
			}
		},
		methods: {
			handleAdd () {
				this.$emit('add', this.index);
			},
			handleRemove () {
				this.$emit('remove', this.index);
			},
			handleView () {
				this.$emit('view', this.index);
			},
			observerCallback () {
				this.show = true;
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.large-item {
		$padding: em(8);
		position: relative;
		width: 100%;
		height: em(328);
		padding: $padding $padding;
		background-color: transparent;
		display: inline-block;
		@include mqMin(xs) {
			width: 50%;
		}
		@include mqMin(m) {
			width: 25%;
		}
		@include mqMin(l) {
			width: 20%;
		}
		&__outer {
			width: 100%;
			height: 100%;
		}
		&__inner {
			position: relative;
			background-color: white;
			box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
			width: 100%;
			height: 100%;
			border-radius: 5px;
			display: flex;
			flex-direction: column;
			cursor: pointer;
			transition: all .5s;
			&:hover {
				box-shadow: 0 0 20px 4px rgba(0,0,0,.1);
			}
		}
		&__background-image {
			flex: 0 0 70%;
			width: 100%;
		}
		&__copy-outer {
			flex: 1 1 100%;
			padding: em(8);
			position: relative;
		}
		&__heading {
			font-size: 16px;
			font-weight: bold;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
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
		&__price-outer {
			position: absolute;
			bottom: em(8);
			right: em(8);
		}
	}
</style>
