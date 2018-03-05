<template>
	<swiper class="swiper-parent" :options="swiperOption" ref="mySwiper">
		<slot></slot>
	</swiper>
</template>

<script>
	export default {
		name: 'Carousel',
		data () {
			return {
				swiperOption: {
					initialSlide: 0,
					slidesPerView: 'auto',
					direction: 'horizontal',
					grabCursor: true,
					setWrapperSize: true,
					wrapperClass: 'swiper-parent__wrapper',
					slideClass: 'swiper-parent__slide'
//					spaceBetween: 16
//					autoHeight: true,
//					paginationProgressRender: null,
//					pagination: null,
//					scrollbar: null,
//					mousewheelControl: false,
//					observeParents: true
				}
			};
		},
		computed: {
			swiper () {
				return this.$refs.mySwiper.swiper;
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.swiper-parent {
		flex: 1 1 100%;
		overflow: hidden;
		&__wrapper {
			height: 100%;
			display: flex;
		}
		&__slide {
			flex: 0 0 auto;
		}
	}
</style>
