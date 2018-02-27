<template>
	<div
		class="login-input"
		:class="{'login-input--active': showInput}"
	>
		<span class="login-input__heading-outer" @click="handleHeadingClick">
			<main-heading
				class="login-input__heading"
				:class="{'login-input__heading--active': showInput}"
				:text="title"
				:className="'delta'"
			></main-heading>
		</span>
		<div
			class="login-input__input-outer"
			:class="{'login-input__input-outer--active': showInput}"
		>
			<input
				v-model="computedInput"
				class="login-input__input"
				ref="input"
				:type="type"
				:title="title"
				@focus="handleHeadingClick"
			/>
		</div>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import MainHeading from '@/js/atomic/main-heading';
	export default {
		name: 'login-input',
		props: {
			title: VueTypes.string.def(''),
			dataKey: VueTypes.string.def(''),
			type: VueTypes.string.def('text'),
			value: VueTypes.string.def('')
		},
		components: {
			MainHeading
		},
		data () {
			return {
				showInput: false
			};
		},
		computed: {
			computedInput: {
				get () {
					return this.value;
				},
				set (value) {
					this.$emit('updateInput', {dataKey: this.dataKey, value});
				}
			}
		},
		methods: {
			handleHeadingClick () {
				this.showInput = true;
				const ref = this.$refs['input'];
				ref.focus();
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.login-input {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: em(64);
		border-bottom: 2px solid lightgrey;
		margin-bottom: em(16);
		transition: all .5s;
		&--active {
			border-bottom: 3px solid $tertiaryColour;
		}
		&__heading {
			color: grey!important;
			&--active {
				color: $tertiaryColour!important;
			}
		}
		&__heading-outer {
			margin-bottom: em(4);
		}
		&__input-outer {
			height: 0;
			transition: all .5s;
			overflow: hidden;
			&--active {
				height: 100%;
			}
		}
		&__input {
			padding: em(8) 0;
			background-color: transparent;
			width: 100%;
		}
	}
</style>
