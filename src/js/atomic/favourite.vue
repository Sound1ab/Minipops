<template>
	<div
		v-if="$route.params.id === 'discogs'"
		class="favourite"
	>
		<div
			v-if="state"
			@click.stop="handleRemove"
		>
			<svgicon
				name="heart"
				:color="'white'"
				width="24"
				height="24"
			>
			</svgicon>
		</div>
		<div
			v-else
			@click.stop="handleAdd"
		>
			<svgicon
				name="heart-outline"
				:color="'white'"
				width="24"
				height="24"
			>
			</svgicon>
		</div>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	import '@/assets/compiled-icons/heart-outline';
	import '@/assets/compiled-icons/heart';
	export default {
		name: 'favourite',
		props: {
			state: VueTypes.bool.def(false)
		},
		methods: {
			handleAdd () {
				this.$emit('add');
			},
			handleRemove () {
				this.$emit('remove');
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.favourite {
		$size: em(32);
		position: absolute;
		top: calc((#{$size} / 3) * -1);
		right: calc((#{$size} / 3) * -1);;
		z-index: 1;
		box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
		background-color: $tertiaryColour;
		border-radius: 50%;
		width: $size;
		height: $size;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>
