<template>
	<div class="album-gallery">
		<main-heading
			class="album-slide__heading"
			:text="'Album Releases'"
			:color="'#E24347'"
			:className="'gamma'"
		></main-heading>
		<swiper class="swiper-parent" :options="swiperOption" ref="mySwiper">
			<swiper-slide
				class="album-gallery__slide"
				v-for="(slide, index) in twoDimensionalSlides"
				:key="`${index}`"
			>
				<album-slide
					v-for="(release, index) in slide"
					:key="`${release.title}-${index}`"
					:release="release"
				></album-slide>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import MainHeading from '@/js/atomic/main-heading';
	import AlbumSlide from '@/js/atomic/album-slide';
	import {mapActions} from 'vuex';
	export default {
		name: 'album-gallery',
		components: {
			MainHeading,
			AlbumSlide
		},
		props: {
			slides: VueTypes.array.def([])
		},
		data () {
			return {
				swiperOption: {
					initialSlide: 0,
					slidesPerView: 5,
					direction: 'horizontal',
					grabCursor: true,
					wrapperClass: 'album-gallery__wrapper',
					slideClass: 'album-gallery__slide',
					spaceBetween: 2,
					effect: 'slide',
					breakpoints: {
						// when window width is <= 320px
						480: {
							slidesPerView: 1
						},
						// when window width is <= 480px
						640: {
							slidesPerView: 2
						},
						960: {
							slidesPerView: 3
						},
						1200: {
							slidesPerView: 4
						},
						1440: {
							slidesPerView: 5
						}
					},
					on: {
						tap: this.handleSlideClick
					}
				}
			};
		},
		computed: {
			swiper () {
				return this.$refs.mySwiper.swiper;
			},
			twoDimensionalSlides () {
				return this.slides.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key])
					: rows[rows.length - 1].push(key)) && rows, []);
			}
		},
		methods: {
			...mapActions([
				'SEARCH_TRANSITION',
				'UPDATE_TOGGLE_STATE'
			]),
			handleSlideClick () {
				const clickedIndex = this.$refs['mySwiper'].swiper.clickedIndex;
				const release = this.slides[clickedIndex];
				const searchQuery = `${release.artist} ${release.title}`;
				const path = 'discogs';
				this.SEARCH_TRANSITION({type: 'SEARCH_SELECTED'});
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: searchQuery}});
				this.UPDATE_TOGGLE_STATE(path);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.album-gallery {
		padding: em(8);
		&__wrapper {
			display: flex;
		}
		&__slide {
			flex: 0 0 auto;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
	}
</style>
