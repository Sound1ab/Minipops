<template>
	<div class="remember-me" @click="handleClick">
	    <input v-model="computedInput" class="remember-me__checkbox" type="checkbox" />
		<p class="remember-me__copy">Remember me</p>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'remember-me',
		props: {
			dataKey: VueTypes.string.def(''),
			value: VueTypes.bool.def(false)
		},
		computed: {
			computedInput: {
				get () {
					return this.value;
				},
				set (value) {
					this.$emit('checkboxUpdate', {dataKey: this.dataKey, value});
				}
			}
		},
		methods: {
			handleClick () {
				this.$emit('checkboxUpdate', {dataKey: this.dataKey, value: !this.value});
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.remember-me {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: em(16);
		&__checkbox {
			margin-right: em(8);
		}
		&__copy {
			color: grey;
			margin-bottom: 0;
			cursor: pointer;
		}
	}
</style>
