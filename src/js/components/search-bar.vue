<template>
	<div class="search-bar">
		<div @click="handleOpenSearch" class="search-bar__magnify">
			<svgicon
				name="magnify"
				color="white"
				width="30"
				height="30"
			>
			</svgicon>
		</div>
		<form-input
			ref="form-input"
			class="search-bar__form"
			:input="searchQuery"
			@inputChanged="handleInputChanged"
		>
		</form-input>
		<close-button
			@closeClick="handleClearSearch"
			class="search-bar__close"
			ref="close"
		>
		</close-button>
		<span
			@click="handleCloseSearch"
			ref="cancel"
			class="search-bar__cancel"
		>
			Cancel
		</span>
	</div>
</template>

<script>
	import Velocity from 'velocity-animate';
	import {mapState, mapActions} from 'vuex';
	import '@/assets/compiled-icons/magnify';
	import FormInput from '@/js/atomic/form-input';
	import CloseButton from '@/js/atomic/close-button';
	export default {
		name: 'SearchBar',
		components: {
			FormInput,
			CloseButton
		},
		data () {
			return {
				timeout: null
			};
		},
		computed: {
			...mapState({
				searchQuery: state => state.search.query,
				state: state => state.search.state
			})
		},
		methods: {
			...mapActions([
				'SEARCH_TRANSITION'
			]),
			expandSearch () {
				const formInput = this.$refs['form-input'].$el;
				const close = this.$refs['close'].$el;
				const cancel = this.$refs['cancel'];
				const menuButton = document.getElementById('menu-button');
				const mainHeading = document.getElementById('main-heading');
				const input = document.getElementById('input');
				Velocity(
					formInput,
					{width: '100%', opacity: 1, paddingRight: 88},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					input,
					{padding: 8}, {visibility: 'visible'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					close,
					{opacity: 1, translateY: ['-50%', '-50%']}, {visibility: 'visible'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					cancel,
					{opacity: 1, translateY: ['-50%', '-50%']}, {visibility: 'visible'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					menuButton,
					{opacity: 0}, {visibility: 'hidden'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					mainHeading,
					{opacity: 0, translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']}, {visibility: 'hidden'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
			},
			retractSearch () {
				const formInput = this.$refs['form-input'].$el;
				const close = this.$refs['close'].$el;
				const cancel = this.$refs['cancel'];
				const menuButton = document.getElementById('menu-button');
				const mainHeading = document.getElementById('main-heading');
				const input = document.getElementById('input');
				Velocity(
					formInput,
					{width: '0%', opacity: 0, paddingRight: 0},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					input,
					{padding: 0}, {visibility: 'hidden'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					close,
					{opacity: 0, translateY: ['-50%', '-50%']}, {visibility: 'hidden'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					cancel,
					{opacity: 0, translateY: ['-50%', '-50%']}, {visibility: 'hidden'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					menuButton,
					{opacity: 1}, {visibility: 'visible'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
				Velocity(
					mainHeading,
					{opacity: 1, translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']}, {visibility: 'visible'},
					{easing: [0.23, 0.73, 0.38, 1]}
				);
			},
			handleOpenSearch () {
				this.SEARCH_TRANSITION({type: 'SEARCH_SELECTED'});
			},
			handleCloseSearch () {
				this.SEARCH_TRANSITION({type: 'CLOSE', params: this.state});
			},
			handleClearSearch () {
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: ''}});
			},
			handleBlur () {
				this.SEARCH_TRANSITION({type: 'CLOSE', params: this.state});
			},
			handleInputChanged (value) {
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: value}});
			}
		},
		watch: {
			'state': function (val, prevVal) {
				switch (true) {
				case val === 'closed':
					this.retractSearch();
					break;
				case (val['searching'] === 'searchReady' && prevVal['searching'] !== 'searchReady'):
					this.expandSearch();
					break;
				}
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.search-bar	{
		display: flex;
		justify-content: flex-end;
		padding-left: 36px;
		align-items: center;
		&__form {
			width: 0;
		}
		&__magnify {
			display: flex;
			align-items: center;
			z-index: 1;
			cursor: pointer;
		}
		&__close {
			opacity: 0;
			position: absolute;
			top: 50%;
			right: em(56);
			transform: translateY(-50%);
		}
		&__cancel {
			opacity: 0;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			color: $tertiaryColour;
			user-select: none;
		}
	}
</style>
