<template>
	<form @submit.prevent="submit" class="form-input">
		<input
			ref="input"
			class="form-input__input"
			@blur.stop.capture.prevent="handleBlur"
			v-model="computedInput"
			type="text"
			placeholder="Search..."
		/>
	</form>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'FormInput',
		props: {
			input: VueTypes.string.def('')
		},
		computed: {
			computedInput: {
				get () {
					return this.input;
				},
				set (value) {
					this.$emit('inputChanged', value);
				}
			}
		},
		methods: {
			handleBlur () {
				this.$emit('inputBlur');
			}
		},
		mounted () {
			const ref = this.$refs['input'];
			ref.focus();
		}
	};
</script>

<style lang="scss" type="text/scss">
	.form-input {
		&__input {
			@include responsive-font(8vw, 32px, 80px, 32px);
			background-color: transparent;
			color: white;
			width: 100%;
		}
	}
</style>
