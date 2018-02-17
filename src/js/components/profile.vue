<template>
	<div class="profile">
		<main-heading
			class="profile__heading"
			:text="'Profile'"
			:color="'#E24347'"
			:className="'gamma'"
		></main-heading>
		<p>{{profile}}</p>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import MainHeading from '@/js/atomic/main-heading';
	export default {
		name: 'profile',
		components: {
			MainHeading
		},
		props: {
			profile: VueTypes.string.def('')
		}
	};
</script>

<style lang="scss" type="text/scss">
	.profile {
		padding: em(8);
		&__heading {
			margin: em(16) 0;
		}
	}
</style>
