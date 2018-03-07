<template>
	<button
		@click="handleClick(path, name)"
		class="toggle-button"
		:class="{'toggle-button--active': isActive}"
	>
		<h1 class="toggle-button__heading">{{heading | upperCase}}</h1>
	</button>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'ToggleButton',
		props: {
			isActive: VueTypes.bool.def(false),
			heading: VueTypes.string.def(''),
			path: VueTypes.string.def(''),
			name: VueTypes.string.def('')
		},
		filters: {
			upperCase (val) {
				return val.toUpperCase();
			}
		},
		methods: {
			handleClick (path, name) {
				this.$emit('toggleButton', {path: path.toLowerCase(), name});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.toggle-button {
		height: 56px;
		position: relative;
		cursor: pointer;
		color: white;
		background-color: transparent;
		border-radius: 25px;
		padding: em(20) em(8);
		&--active {
			&:after {
				content: '';
				position: absolute;
				background-color: $tertiaryColour;
				height: em(4);
				width: 100%;
				left: 0;
				bottom: 0;
			}
		}
		&__heading {
			font-weight: bold;
			font-size: 14px;
			@include mqMin(xs) {
				font-size: 16px;
			}
		}
	}
</style>
