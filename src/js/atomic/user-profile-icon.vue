<template>
	<div class="user-profile-icon" @click="handleClick" :style="style"></div>
</template>

<script>
	import VueTypes from 'vue-types';
	import Tooltip from '@/js/atomic/tooltip';
	import {mapActions, mapState} from 'vuex';
	export default {
		name: 'user-profile-icon',
		props: {
			size: VueTypes.number.def(56)
		},
		components: {
			Tooltip
		},
		data () {
			return {
				show: false
			};
		},
		computed: {
			...mapState({
				profile: state => state.ui.profile
			}),
			style () {
				return {
					width: `${this.size}px`,
					height: `${this.size}px`
				};
			}
		},
		methods: {
			...mapActions([
				'TOGGLE_PROFILE'
			]),
			handleClick () {
				this.TOGGLE_PROFILE(!this.profile);
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.user-profile-icon {
		$size: 56px;
		width: $size;
		height: $size;
		border-radius: 50%;
		cursor: pointer;
		border: solid 2px $tertiaryColour;
		background-image: url('~@/assets/images/profile_ppiaod.jpg');
		background-size: cover;
		background-position: center;
		&__menu {
			position: absolute!important;
			width: em(180);
			top: 100%;
			right: em(8);
		}
	}
</style>
