<template>
	<div class="basic-list">
	    <ul>
			<a
				v-if="link"
				v-for="(item, index) in items"
				:key="`${item}-${index}`"
				:href="item"
				target="_blank"
				rel="noopener"
			>
				<li class="basic-list__item basic-list__item--link">{{item}}</li>
			</a>
			<li
				class="basic-list__item"
				v-if="!link"
				v-for="(item, index) in items"
				:key="`${item}-${index}`"
			>
				{{item}}
			</li>
		</ul>
	</div>
</template>

<script>
	import VueTypes from 'vue-types';
	export default {
		name: 'basic-list',
		props: {
			items: VueTypes.array.def([]),
			link: VueTypes.bool.def(false)
		}
	};
</script>

<style lang="scss" type="text/scss">
	.basic-list {
		&__item {
			&--link {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
