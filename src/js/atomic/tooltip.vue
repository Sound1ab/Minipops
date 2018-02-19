<template>
	<transition name="fade-up" mode="out-in">
		<div
			class="tooltip" :style="outerStyle[trianglePosition]">
			<slot></slot>
			<div class="tooltip__triangle" :style="triangleStyle[trianglePosition]"></div>
		</div>
	</transition>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'tooltip',
		props: {
			color: VueTypes.string.def('white'),
			size: VueTypes.string.def('16px'),
			nudge: VueTypes.string.def('0px'),
			trianglePosition: VueTypes.string.def('top')
		},
		computed: {
			outerStyle () {
				return {
					top: {
						marginTop: `calc(${this.size} + 4px)`,
						backgroundColor: this.color
					},
					right: {
						marginRight: `calc(${this.size} + 4px)`,
						backgroundColor: this.color
					},
					bottom: {
						marginBottom: `calc(${this.size} + 4px)`,
						backgroundColor: this.color
					},
					left: {
						marginLeft: `calc(${this.size} + 4px)`,
						backgroundColor: this.color
					}
				};
			},
			triangleStyle () {
				return {
					top: {
						bottom: '100%',
						left: `calc(50% + ${this.nudge})`,
						borderBottomColor: this.color,
						marginLeft: `-${this.size}`,
						borderWidth: this.size,
						marginTop: `calc(${this.size} + 8px)`
					},
					right: {
						left: '100%',
						top: `calc(50% + ${this.nudge})`,
						borderLeftColor: this.color,
						marginTop: `-${this.size}`,
						borderWidth: this.size,
						marginRight: `calc(${this.size} + 8px)`
					},
					bottom: {
						top: '100%',
						left: `calc(50% + ${this.nudge})`,
						borderTopColor: this.color,
						marginLeft: `-${this.size}`,
						borderWidth: this.size,
						marginBottom: `calc(${this.size} + 8px)`
					},
					left: {
						right: '100%',
						top: `calc(50% + ${this.nudge})`,
						borderRightColor: this.color,
						marginTop: `-${this.size}`,
						borderWidth: this.size,
						marginLeft: `calc(${this.size} + 8px)`
					}
				};
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.tooltip {
		position: relative;
		padding: em(16);
		border-radius: em(8);
		max-width: em(180);
		color: $tertiaryColour;
		text-align: center;
		box-shadow: 0 0 20px 4px rgba(0,0,0,.2);
		&__triangle {
			border: solid transparent;
			content: " ";
			height: 0;
			width: 0;
			position: absolute;
			pointer-events: none;
			border-color: rgba(136, 183, 213, 0);
		}
	}
</style>
