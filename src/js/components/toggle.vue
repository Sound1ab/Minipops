<template>
	<div class="toggle">
		<swiper-parent>
			<swiper-slide
				v-for="obj in data"
				:key="obj.path"
				class="toggle__button-outer"
			>
				<toggle-button
					:isActive="obj.match.includes(currentTab)"
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
						match: 'current'
					},
					{
						heading: 'eBay Completed',
						path: 'completed',
						match: 'completed'
					},
					{
						heading: 'Discogs',
						path: 'discogs',
						match: 'discogs'
					},
					{
						heading: 'Discovery',
						path: 'discovery',
						match: 'discovery artist-releases'
					}
				];
			}
		},
		methods: {
			...mapActions([
				'UPDATE_TOGGLE_STATE'
			]),
			handleToggleButton ({path}) {
				this.$router.push({path: `/${path}`});
			},
			syncState (val) {
				let path = val.split('/').filter(v => v)[0];
				this.UPDATE_TOGGLE_STATE(path);
			}
		},
		watch: {
			'$route.path': function (val) {
				this.syncState(val);
			}
		},
		created () {
			this.syncState(this.$route.path);
		}
	};
</script>

<style lang="scss" type="text/scss">
	.toggle {
		flex: 0 0 56px;
		position: relative;
		width: 100%;
		z-index: 1;
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
		&__button-outer {
			display: inline-block;
		}
	}
</style>
