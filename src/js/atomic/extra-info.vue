<template>
	<div class="extra-info">
		<main-heading
			class="profile__heading"
			:text="'Additional Information'"
			:color="'#E24347'"
			:className="'gamma'"
		></main-heading>
		<main-heading
			v-if="members.length > 0"
			class="profile__heading"
			:text="'Members'"
			:color="'#E24347'"
			:className="'delta'"
		></main-heading>
		<basic-list
			v-if="members.length > 0"
			:items="members"
		></basic-list>
		<main-heading
			v-if="nameVariations.length > 0"
			class="profile__heading"
			:text="'Name Variations'"
			:color="'#E24347'"
			:className="'delta'"
		></main-heading>
		<basic-list
			v-if="nameVariations.length > 0"
			:items="nameVariations"
		></basic-list>
		<main-heading
			v-if="links.length > 0"
			class="profile__heading"
			:text="'Links'"
			:color="'#E24347'"
			:className="'delta'"
		></main-heading>
		<basic-list
			v-if="links.length > 0"
			:items="links"
			:link="true"
		></basic-list>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import MainHeading from '@/js/atomic/main-heading';
	import BasicList from '@/js/atomic/basic-list';
	export default {
		name: 'extra-info',
		components: {
			MainHeading,
			BasicList
		},
		props: {
			members: VueTypes.array.def([]),
			nameVariations: VueTypes.array.def([]),
			links: VueTypes.array.def([])
		}
	};
</script>

<style lang="scss" type="text/scss">
	.extra-info {
		padding: em(8);
		&__heading {
			margin-bottom: em(16);
		}
	}
</style>
