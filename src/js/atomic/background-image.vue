<template>
	<div class="background-image">
		<div
			v-if="image"
			class="background-image__image"
			v-progressive-image="{
					src: image,
					placeholder: requireImage('prog-image.png'),
					background: true
				}"
		></div>
		<div v-if="gradient" class="background-image__gradient"></div>
		<slot></slot>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'background-image',
		props: {
			image: VueTypes.string.def(''),
			gradient: VueTypes.bool.def(false)
		},
		computed: {
			background () {
				return {
					backgroundImage: `url('${this.image}')`
				};
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.background-image {
		background-color: $tertiaryColour;
		&__image {
			background-position: center;
			background-size: cover;
			position: relative;
			width: 100%;
			height: 100%;
		}
		&__gradient {
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			background: linear-gradient(45deg, rgba(0,0,0,0.74) 0%,rgba(0,0,0,0) 100%);
			//background: linear-gradient(to bottom, rgba(30,87,153,0) 0%,rgba(109,146,189,0) 35%,rgba(255,255,255,1) 100%);
		}
	}
</style>
