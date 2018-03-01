<template>
	<div class="side-bar">
		<!--<transition name="side-bar">-->
			<div class="side-bar__menu">
				<div class="side-bar__heading">
					<main-heading
						:text="'Wantlist'"
						:color="'white'"
						:className="'gamma'"
					>
					</main-heading>
					<close-button
						:color="'white'"
						@closeClick="handleCloseBar"
					>
					</close-button>
				</div>
				<scrolling-container class="side-bar__wantlist" id="side-bar">
					<wantlist></wantlist>
				</scrolling-container>
			</div>
		<!--</transition>-->
	</div>
</template>

<script>
//	import VueTypes from 'vue-types';
	import MainHeading from '@/js/atomic/main-heading';
	import CloseButton from '@/js/atomic/close-button';
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import Wantlist from '@/js/components/wantlist';
	import {watch} from '@/js/helpers/dismiss-modal';
	import {mapActions, mapState} from 'vuex';
	export default {
		name: 'SideBar',
		components: {
			MainHeading,
			CloseButton,
			ScrollingContainer,
			Wantlist
		},
		computed: {
			...mapState({
				open: state => state.ui.menu
			})
		},
		methods: {
			...mapActions([
				'TOGGLE_MENU'
			]),
			handleCloseBar () {
				this.TOGGLE_MENU(false);
			}
		},
		watch: {
			open: function (val) {
				if (val) {
					watch('#side-bar', () => {
						this.handleCloseBar();
					});
				}
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.side-bar {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
		top: 0;
		left: 0;
		pointer-events: none;
		&__menu {
			position: relative;
			width: em(320);
			height: 100%;
			//background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
			background: linear-gradient(to bottom, $primaryColour 0%, darken($primaryColour, 30%) 100%);
			z-index: 3;
			display: flex;
			flex-direction: column;
			pointer-events: all;
		}
		&__heading {
			padding: em(16);
			color: white;
			display: flex;
			justify-content: space-between;
		}
		&__wantlist {
			background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
			flex: 1 1 100%;
		}
	}
</style>
