<template>
	<form @submit.prevent="submit" class="form-input" ref="input">
		<input
			id="input"
			class="form-input__input"
			@blur="handleBlur"
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
		}
	};
</script>

<style lang="scss" type="text/scss">
	.form-input {
		&__input {
			width: 100%;
			background-color: transparent;
			color: white;
			padding: 0;
			visibility: hidden;
		}
	}
</style>
