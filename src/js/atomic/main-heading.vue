<template>
	<div class="nav-heading" :style="{color}">
		<h1 :class="['nav-heading__heading', className]" >{{text}}</h1>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'NavHeading',
		props: {
			text: VueTypes.string.def(''),
			color: VueTypes.string.def('white'),
			className: VueTypes.string.def('delta')
		}
	};
</script>

<style lang="scss" type="text/scss">
	.nav-heading {
		&__heading {
			margin-bottom: 0!important;
		}
	}
</style>
