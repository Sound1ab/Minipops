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
					:name="obj.name"
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
				currentTab: state => state.toggle.state
			}),
			data () {
				return [
					{
						heading: 'eBay Current',
						path: 'current',
						name: 'items'
					},
					{
						heading: 'eBay Completed',
						path: 'completed',
						name: 'items'
					},
					{
						heading: 'Discogs',
						path: 'discogs',
						name: 'items'
					},
					{
						heading: 'Related Artists',
						path: 'related-artists',
						name: 'items'
					}
				];
			}
		},
		methods: {
			...mapActions([
				'UPDATE_TOGGLE_STATE'
			]),
			handleToggleButton ({path}) {
				this.UPDATE_TOGGLE_STATE(path);
			},
			syncState (val) {
				let tab = this.data.filter(el => {
					return el.path === val;
				})[0];
				this.$router.push({name: tab.name, params: {id: tab.path}});
			}
		},
		watch: {
			'currentTab': function (val) {
				this.syncState(val);
			}
		},
		created () {
			this.UPDATE_TOGGLE_STATE(this.$route.params.id);
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
