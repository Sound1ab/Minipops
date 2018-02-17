<template>
	<div class="album-slide">
		<background-image
			class="album-slide__album-cover"
			:image="release.thumb"
		>
		</background-image>
		<div class="album-slide__information">
			<main-heading
				class="album-slide__heading"
				:text="release.title"
				:color="'#E24347'"
				:className="'delta'"
			></main-heading>
			<span
				v-if="release.year"
				class="album-slide__info"
			>
				Release - {{release.year}}</span>
			<!--<span-->
				<!--v-if="release.label"-->
				<!--class="album-slide__info album-slide__info&#45;&#45;label"-->
			<!--&gt;-->
				<!--Label - {{release.label}}</span>-->
			<!--<span-->
				<!--v-if="release.format"-->
				<!--class="album-slide__info album-slide__info&#45;&#45;format"-->
			<!--&gt;-->
				<!--Format - {{release.format}}</span>-->
		</div>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import BackgroundImage from '@/js/atomic/background-image';
	import MainHeading from '@/js/atomic/main-heading';
	export default {
		name: 'album-slide',
		components: {
			BackgroundImage,
			MainHeading
		},
		props: {
			release: VueTypes.object.def({})
		}
	};
</script>

<style lang="scss" type="text/scss">
	.album-slide {
		flex: 0 0 50%;
		padding: em(4);
		position: relative;
		//height: 100%;
		//height: calc(((100vw / 2) - 8px) + 132px);
		//@include mqMin(xs) {
		//	height: calc(((100vw / 2) - 8px) + 132px);
		//}
		//@include mqMin(s) {
		//	height: calc(((100vw / 3) - 8px) + 132px);
		//}
		//@include mqMin(m) {
		//	height: calc(((100vw / 4) - 8px) + 132px);
		//}
		//@include mqMin(l) {
		//	height: calc(((100vw / 5) - 8px) + 132px);
		//}
		&__album-cover {
			height: calc((100vw / 2) - 16px);
			@include mqMin(xs) {
				height: calc(((100vw / 4) - 8px) - 8px);
			}
			@include mqMin(s) {
				height: calc(((100vw / 6) - 8px) - 8px);
			}
			@include mqMin(m) {
				height: calc(((100vw / 8) - 8px) - 8px);
			}
			@include mqMin(l) {
				height: calc(((100vw /10) - 8px) - 8px);
			}
		}
		&__information {
			padding: em(8);
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100%;
			width: 100%;
			margin: auto;
			opacity: 0;
			transition: .5s ease;
			background-color: rgba(0,0,0,0.8);
			cursor: pointer;
			&:hover {}
		}
		&__heading {
			margin-bottom: em(16);
		}
		&__info {
			display: block;
			margin-bottom: em(4);
			color: white;
			overflow: hidden;
			&--label {
				color: darken(white, 20%);
			}
			&--format {
				font-size: 14px;
				color: darken(white, 30%);
			}
		}
	}
</style>
