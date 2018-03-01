<script type="text/jsx">
	import VueTypes from 'vue-types';
	import {mapActions} from 'vuex';
	export default {
		name: 'navigate-form',
		props: {
			schema: VueTypes.object.def({})
		},
		methods: {
			...mapActions([
				'USER_TRANSITION'
			]),
			handleClick (path) {
				this.USER_TRANSITION({type: path});
			},
			createLinkHtml (h, schema, end) {
				return (
					<span>
						<p
							onclick={this.handleClick.bind(null, schema.onClick)}
							class="navigate-form__link"
						>
							{schema.copy}
						</p>
						{end ? null : ' or '}
					</span>
				)
			},
			createContainerHtml (h, schema) {
				return (
					<span class="navigate-form__outer">
						{schema.border ? <hr  class="navigate-form__border"/> : null}
						<p class="navigate-form__copy">{schema.heading}</p>
						<span>{schema.children ? schema.children.map((el, index) => (
							this.createLinkHtml(h, el, schema.children.length - 1 === index)
						)) : null}</span>
					</span>
				);
			}
		},
		render (h) {
			return (
				<div class="navigate-form">
					{this.createContainerHtml(h, this.$props.schema)}
				</div>
			);
		}
	};
</script>

<style lang="scss" type="text/scss">
	.navigate-form {
		color: grey;
		&__outer {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
		&__border {
			margin: 16px;
			width: 60%;
			color: #eaeaea;
		}
		&__copy {
			color: grey;
			font-size: 14px;
			margin-bottom: em(8);
		}
		&__link {
			display: inline;
			color: $tertiaryColour;
			cursor: pointer;
		}
	}
</style>
