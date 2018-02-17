<template>
	<transition name="fade" mode="out-in">
		<div class="loading" v-if="loading">
			<spin360-infinite :rotate="true">
				<svgicon
					name="loading"
					class="loading__icon"
					color="#E24347"
					width="100"
					height="100"
				>
				</svgicon>
			</spin360-infinite>
		</div>
	</transition>
</template>

<script>
	import '@/assets/compiled-icons/loading';
	import Spin360Infinite from '@/js/transitions/spin-360-infinite';
	import {mapState} from 'vuex';
	export default {
		name: 'loading',
		components: {
			Spin360Infinite
		},
		computed: {
			...mapState({
				loading: state => state.ui.loading
			})
		}
	};
</script>

<style lang="scss" type="text/scss">
	.loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center;
		&__icon {
			color: $tertiaryColour;
			fill: $tertiaryColour;
		}
	}
</style>
