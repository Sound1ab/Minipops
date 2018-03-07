<template>
	<div
		class="wantlist-item"
		:class="{'wantlist-item--watching': watching}"
	>
		<background-image :key="imageUrl" class="wantlist-item__background-image" :image="imageUrl"></background-image>
		<div class="wantlist-item__copy-outer">
			<h1 class="delta wantlist-item__title">{{artist}} {{album}}</h1>
		</div>
		<div class="wantlist-item__drag">
			<svgicon
				name="drag-vertical"
				:color="'#E24347'"
				width="30"
				height="30"
			>
			</svgicon>
		</div>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import BackgroundImage from '@/js/atomic/background-image';
	import '@/assets/compiled-icons/drag-vertical';
	export default {
		name: 'wantlist-item',
		components: {
			BackgroundImage
		},
		props: {
			artist: VueTypes.string.def(''),
			album: VueTypes.string.def(''),
			spotifyId: VueTypes.string.def(''),
			imageUrl: VueTypes.string.def(''),
			watching: VueTypes.bool.def(false)
		}
	};
</script>

<style lang="scss" type="text/scss">
	$height: 50;
	.wantlist-item {
		position: relative;
		width: 100%;
		background-color: #f4f3f4;
		padding: em(8);
		height: em(56);
		z-index: 1;
		display: flex;
		justify-content: flex-start;
		border-bottom: 1px solid lightgray;
		&--watching {
			box-shadow: inset -4px 0px 0px 0px $tertiaryColour;
		}
		&__background-image {
			flex: 0 0 52px;
			height: 100%;
			margin-right: em(16);
		}
		&__copy-outer {
			flex: 2 1 auto;
			margin-right: em(8);
			position: relative;
			display: flex;
			align-items: center;
			overflow: hidden;
		}
		&__title {
			margin-bottom: 0!important;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: bold;
			font-size: 12px!important;
			@include mqMin(xs) {
				font-size: 14px!important;
			}
		}
		&__drag {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
