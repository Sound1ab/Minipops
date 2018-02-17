<template>
	<nav class="heading-bar">
		<menu-button
			id="menu-button"
			class="heading-bar__menu"
			:color="'white'"
			@menuClick="handleMenuClick"
		>
		</menu-button>
		<main-heading
			id="main-heading"
			class="heading-bar__heading"
			:text="'Minipops'"
			:className="'gamma'"
		>
		</main-heading>
		<search-bar
			class="heading-bar__search-bar"
			@searchSubmit="handleSearchSubmit"
		>
		</search-bar>
		<sort></sort>
	</nav>
</template>

<script>
	import MenuButton from '@/js/atomic/menu-button';
	import MainHeading from '@/js/atomic/main-heading';
	import SearchBar from '@/js/components/search-bar';
	import Sort from '@/js/components/sort';
	import {mapActions} from 'vuex';
	export default {
		name: 'heading-bar',
		components: {
			MenuButton,
			MainHeading,
			SearchBar,
			Sort
		},
		methods: {
			...mapActions([
				'TOGGLE_MENU'
			]),
			handleMenuClick () {
				this.TOGGLE_MENU(true);
			},
			handleSearchSubmit () {
				console.log('handleSearchSubmit');
			},
			handleButtonClick () {
				console.log('fire');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.heading-bar {
		/*display: flex;*/
		/*justify-content: space-between;*/
		padding: em(16);
		position: relative;
		background-color: transparent;
		&__menu {
			position: relative;
			display: inline-block;
			z-index: 2;
		}
		&__heading {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
		}
		&__search-bar {
			position: absolute;
			transform: translateY(-50%);
			top: 50%;
			right: em(56);
			width: calc(100% - 32px);
			z-index: 1;
		}
	}
</style>
