<template>
	<nav class="heading-bar">
		<menu-button
			id="menu-button"
			class="heading-bar__menu"
			:color="'white'"
			@menuClick="handleMenuClick"
			@backClick="handleBackClick"
		>
		</menu-button>
		<main-heading
			id="main-heading"
			class="heading-bar__heading"
			:text="'Minipops'"
			:className="'gamma'"
		>
		</main-heading>
		<div
			@click="handleOpenSearch"
			class="heading-bar__search"
		>
			<svgicon
				name="magnify"
				color="white"
				width="30"
				height="30"
			>
			</svgicon>
		</div>
		<sort
			class="heading-bar__sort"
			:disabled="tab !== 'current' && tab !== 'completed'"
		></sort>
		<user-profile-icon
			class="heading-bar__user-profile"
			@handleIconClick="handleIconClick"
		></user-profile-icon>
	</nav>
</template>

<script>
	import MenuButton from '@/js/atomic/menu-button';
	import MainHeading from '@/js/atomic/main-heading';
	import SearchBar from '@/js/components/search-bar';
	import Sort from '@/js/components/sort';
	import UserProfileIcon from '@/js/atomic/user-profile-icon';
	import '@/assets/compiled-icons/magnify';
	import {mapActions, mapState} from 'vuex';
	export default {
		name: 'heading-bar',
		components: {
			MenuButton,
			MainHeading,
			SearchBar,
			Sort,
			UserProfileIcon
		},
		computed: {
			...mapState({
				tab: state => state.toggle.state,
				search: state => state.ui.search
			})
		},
		methods: {
			...mapActions([
				'TOGGLE_MENU',
				'TOGGLE_SEARCH',
				'TOGGLE_PROFILE'
			]),
			handleMenuClick () {
				this.TOGGLE_MENU(true);
			},
			handleSearchSubmit () {
				console.log('handleSearchSubmit');
			},
			handleOpenSearch () {
				this.TOGGLE_SEARCH(true);
			},
			handleButtonClick () {
				console.log('fire');
			},
			handleBackClick () {
				this.$router.go(-1);
			},
			handleIconClick () {
				this.TOGGLE_PROFILE(!this.profile);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.heading-bar {
		flex: 0 0 auto;
		display: flex;
		padding: em(16);
		position: relative;
		background-color: $primaryColour;
		align-items: center;
		&__menu {
			position: relative;
			display: inline-block;
			z-index: 2;
		}
		&__heading {
			margin-left: em(16);
			@include mqMin(xs) {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
		}
		&__search {
			margin-left: auto;
			cursor: pointer;
		}
		&__search-bar {
			position: absolute;
			transform: translateY(-50%);
			top: 50%;
			right: em(56);
			width: calc(100% - 32px);
			z-index: 1;
		}
		&__sort {
			margin-left: em(16);
		}
		&__user-profile {
			margin-left: em(16);
		}
	}
</style>
