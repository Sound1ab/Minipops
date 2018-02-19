<template>
	<div class="artist">
		<background-image
			v-if="artistInfo.images"
			class="artist__banner"
			:image="artistInfo.images[0].resource_url"
			:gradient="true"
		>
			<main-heading
				class="artist__title"
				:text="artistInfo.name"
				:color="'white'"
				:className="'alpha'"
			>
			</main-heading>
		</background-image>
		<main-heading
			v-else="!artistInfo.images && artistInfo.name"
			class="artist__title"
			:text="artistInfo.name"
			:color="'white'"
			:className="'alpha'"
		>
		</main-heading>
		<profile
			v-if="artistInfo.profile"
			:profile="artistInfo.profile"
		></profile>
		<album-gallery
			v-if="artistInfo.releases"
			:slides="artistInfo.releases"
		></album-gallery>
		<extra-info
			v-if="members || artistInfo.namevariations || artistInfo.urls"
			:members="members"
			:name-variations="artistInfo.namevariations"
			:links="artistInfo.urls"
		></extra-info>
	</div>
</template>

<script>
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import BackgroundImage from '@/js/atomic/background-image';
	import MainHeading from '@/js/atomic/main-heading';
	import Profile from '@/js/components/profile';
	import AlbumGallery from '@/js/components/album-gallery';
	import ExtraInfo from '@/js/atomic/extra-info';
	import {mapState} from 'vuex';
	export default {
		name: 'artist',
		components: {
			ScrollingContainer,
			BackgroundImage,
			MainHeading,
			Profile,
			AlbumGallery,
			ExtraInfo
		},
		computed: {
			...mapState({
				artistInfo: state => state.artist.artistInfo
			}),
			members () {
				if (!this.artistInfo.members) {
					return;
				}
				return this.artistInfo.members.map(el => `${el.name} ${el.active ? '- active' : ''}`);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.artist {
		position: relative;
		background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
		&__title {
			padding: em(8);
			position: absolute;
			bottom: 0;
		}
		&__banner {
			position: relative;
			width: 100%;
			height: calc((100vw / 2));
			max-height: em(480);
			min-height: em(220);
		}
	}
</style>
