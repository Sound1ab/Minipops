<!--<template>-->
	<!--<li class="swipe-to-reveal">-->
		<!--<div-->
			<!--ref="swipe-to-reveal"-->
			<!--class="swipe-to-reveal__top"-->
			<!--@click.capture="handleGhostClick(index)"-->
			<!--v-swipe-to-delete="{boundary: 70, translateX}"-->
			<!--prevent-click="click-through"-->
			<!--swipe-to-delete="start"-->
		<!--&gt;-->
			<!--<slot></slot>-->
		<!--</div>-->
		<!--<div class="swipe-to-reveal__bottom">-->
			<!--<div class="swipe-to-reveal__bottom-inner" :style="innerSize">-->
				<!--<button-->
					<!--v-for="obj in buttons"-->
					<!--v-if="!obj.initial"-->
					<!--class="swipe-to-reveal__button"-->
					<!--@click="handleClick(obj.emit)"-->
				<!--&gt;-->
					<!--{{obj.heading}}-->
				<!--</button>-->
			<!--</div>-->
		<!--</div>-->
	<!--</li>-->
<!--</template>-->

<script type="text/jsx">
	import VueTypes from 'vue-types';
	export default {
		name: 'swipe-to-reveal',
		props: {
			configuration: VueTypes.object.def({
				boundary: 0,
				translateX: 0,
				buttons: []
			}),
			index: VueTypes.number.def(0),
			reset: VueTypes.bool.def(false),
			buttonState: VueTypes.string.def(''),
			disable: VueTypes.bool.def(false)
		},
		computed: {
			innerSize () {
				return {
					width: `${this.configuration.translateX}px`
				};
			}
		},
		methods: {
			handleGhostClick (index) {
				const element = this.$refs['swipe-to-reveal'];
				const preventClickAttribute = this.getAttribute(element, 'prevent-click');
				const swipeToDeleteAttribute = this.getAttribute(element, 'swipe-to-delete');
				if (preventClickAttribute === 'click-through' && swipeToDeleteAttribute === 'start') {
					this.$emit('onClick', index);
				}
			},
			handleClick (emit) {
				this.$emit(emit, this.index);
//				this.resetPosition();
			},
			createStyles (styles) {
				return {
					...styles,
					flex: `1 1 ${100 / this.buttons.length}%`
				};
			},
			resetPosition () {
				const ref = this.$refs['swipe-to-reveal'];
				ref.setAttribute('swipe-to-delete', 'start');
				ref.style.transform = `translate3d(${0}px, 0, 0 )`;
			},
			getAttribute (ref, name) {
				return ref.getAttribute(name);
			},
			createStatefulButton: function createStatefulButton (h, buttons) {
				const button = buttons.states[this.buttonState];
				return (
					<button
						class="swipe-to-reveal__button"
						onClick={this.handleClick.bind(null, button.emit)}
					>
						{button.heading}
					</button>
				);
			},
			createButton: function createStatefulButton (h, button) {
				return (
					<button
						class="swipe-to-reveal__button"
						onClick={(this.handleClick.bind(null, button.emit))}
					>
						{button.heading}
					</button>
				);
			}
		},
		watch: {
			'reset': function (val) {
				if (val) {
					this.resetPosition();
				}
			}
		},
		render (h) {
			return (
				<li class="swipe-to-reveal">
					<div
						ref="swipe-to-reveal"
						class="swipe-to-reveal__top"
						onClick:capture={this.handleGhostClick.bind(null, this.$props.index)}
						v-swipe-to-delete={{
							value:
								{
									disable: this.$props.disable,
									boundary: this.$props.configuration.boundary,
									translateX: this.$props.configuration.translateX
								},
							modifier: true
						}}
						prevent-click="click-through"
						swipe-to-delete="start"
					>
						{this.$slots.default}
					</div>
					<div class="swipe-to-reveal__bottom">
						<div class="swipe-to-reveal__bottom-inner" style={this.innerSize}>
							{this.$props.configuration.buttons.map(el => {
								return el.states
									? this.createStatefulButton(h, el) : this.createButton(h, el)
							})}
						</div>
					</div>
				</li>
			)
		}
	};
</script>

<style lang="scss" type="text/scss">
	.swipe-to-reveal {
		position: relative;
		width: 100%;
		background-color: white;
		//box-shadow: -2px 3px 7px -2px rgba(0,0,0,0.3);
		cursor: pointer;
		//margin-bottom: 0.1em;
		&__top {
			width: 100%;
			height: 100%;
			top: 0px;
			left: 0px;
			position: relative;
			z-index: 1;
		}
		&__bottom {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			z-index: 0;
			background: $primaryColour;
		}
		&__bottom-inner {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			/*padding: em(8);*/
			background: $primaryColour;
			display: flex;

		}
		&__button {
			flex: 1 1 100%;
			padding: 0;
			color: white;
			font-size: 12px;
			&:nth-child(1) {
				background: $tertiaryColour;
			}
			&:nth-child(2) {
				background: darken($tertiaryColour, 10%);
			}
			&:nth-child(3) {
				background: darken($tertiaryColour, 20%);
			}
		}
	}
</style>
