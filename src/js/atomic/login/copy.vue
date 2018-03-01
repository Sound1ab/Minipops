<template>
	<div class="form-copy">
		<p class="form-copy__copy">{{copy}}</p>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'form-copy',
		props: {
			copy: VueTypes.string.def('')
		}
	};
</script>

<style lang="scss" type="text/scss">
	.form-copy {
		&__copy {
			color: grey;
		}
	}
</style>
