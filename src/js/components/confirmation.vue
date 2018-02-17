<template>
		<transition name="fade-up" mode="out-in" >
	<div class="action-confirmation" v-if="confirmation.state">
			<div class="action-confirmation__inner" >
				<svgicon
					v-if="confirmation.value"
					name="check"
					color="#E24347"
					width="50"
					height="50"
				>
				</svgicon>
				<svgicon
					v-else
					name="close"
					color="#E24347"
					width="50"
					height="50"
				>
				</svgicon>
			</div>
	</div>
		</transition>
</template>

<script>
	import '@/assets/compiled-icons/check';
	import '@/assets/compiled-icons/close';
	import {mapState} from 'vuex';
	export default {
		name: 'action-confirmation',
		computed: {
			...mapState({
				confirmation: state => state.wantlist.confirmation
			})
		}
	};
</script>

<style lang="scss" type="text/scss">
	.action-confirmation {
		z-index: 5;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		&__inner {
			position: relative;
			width: em(100);
			height: em(100);
			border-radius: 50%;
			background-color: white;
			border: solid $tertiaryColour 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			//&:after {
			//	content: '';
			//	animation: ripple 1s;
			//	animation-delay: .5s;
			//	background: $primaryColour;
			//	display: block;
			//	position: absolute;
			//	border-radius: 50%;
			//	z-index: -1;
			//}
		}
		&__icon-success {
			fill: $tertiaryColour;
		}
		&__icon-failed {
			fill: $tertiaryColour;
		}
	}
</style>
