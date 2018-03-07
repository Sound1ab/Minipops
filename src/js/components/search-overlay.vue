<template>
	<transition name="fade-up" mode="out-in">
		<div class="search-overlay" v-if="search">
			<form-input
				id="form-input"
				class="alpha search-overlay__input"
				:input="searchQuery"
				:autofocus="true"
				@inputChanged="handleInputChanged"
			>
			</form-input>
		</div>
	</transition>
</template>

<script>
	import FormInput from '@/js/atomic/form-input';
	import {mapState, mapActions} from 'vuex';
	import {watch} from '@/js/helpers/dismiss-modal';
	export default {
		name: 'search-overlay',
		components: {
			FormInput
		},
		computed: {
			...mapState({
				searchQuery: state => state.search.query,
				state: state => state.search.state,
				search: state => state.ui.search,
				tab: state => state.toggle.state,
				user: state => state.user.user
			})
		},
		methods: {
			...mapActions([
				'SEARCH_TRANSITION',
				'TOGGLE_SEARCH'
			]),
			handleClearSearch () {
				this.SEARCH_TRANSITION({type: 'TEXT_INPUT', params: {query: ''}});
			},
			handleBlur () {
				this.TOGGLE_SEARCH(false);
			},
			handleInputChanged (value) {
				this.SEARCH_TRANSITION({
					type: 'TEXT_INPUT',
					params: {
						type: 'SEARCH_DISPATCH',
						query: value,
						tab: this.tab,
						user: this.user.idToken
					}
				});
			}
		},
		watch: {
			search: function (val) {
				if (val) {
					watch('#form-input', () => {
						this.handleBlur();
					});
				}
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.search-overlay {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		padding-top: em(144);
		background-color: rgba(0,0,0,.5);
		z-index: 2;
		&__input {
			@include responsive-font(8vw, 32px, 80px, 32px);
			background-color: transparent;
			color: white;
			width: 100%;
		}
	}
</style>
