<template>
	<div class="toggle">
		<swiper-parent>
			<swiper-slide
				v-for="obj in data"
				:key="obj.path"
				class="toggle__button-outer"
			>
				<toggle-button
					:isActive="obj.path === currentTab"
					:heading="obj.heading"
					:path="obj.path"
					@toggleButton="handleToggleButton"
				>
				</toggle-button>
			</swiper-slide>
		</swiper-parent>
	</div>
</template>

<script>
	import ToggleButton from '@/js/atomic/toggle-button';
	import SwiperParent from '@/js/atomic/swiper-parent';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'Toggle',
		components: {
			ToggleButton,
			SwiperParent
		},
		computed: {
			...mapState({
				currentTab: state => state.toggle.state.buttonSelected
			}),
			data () {
				return [
					{
						heading: 'eBay Current',
						path: 'current'
					},
					{
						heading: 'eBay Completed',
						path: 'completed'
					},
					{
						heading: 'Discogs',
						path: 'discogs'
					},
					{
						heading: 'Related Artists',
						path: 'related-artists'
					}
				];
			}
		},
		methods: {
			...mapActions([
				'TOGGLE_TRANSITION'
			]),
			handleToggleButton (path) {
				this.TOGGLE_TRANSITION({type: 'CLICK', params: {path, router: this.$router}});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.toggle {
		flex: 0 0 auto;
		position: relative;
		width: 100%;
		z-index: 1;
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		&__button-outer {
			display: inline-block;
		}
	}
</style>
