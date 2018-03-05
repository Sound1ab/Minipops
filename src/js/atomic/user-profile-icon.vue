<template>
	<div
		class="user-profile-icon"
		@click="handleClick"
		:style="style"
	>
		<form class="user-profile-icon__form" v-if="allowImageUpload">
			<input
				@change="handleChange"
				class="user-profile-icon__input"
				ref="input"
				type="file"
				id="profile_pic"
				name="profile_pic"
				accept=".jpg, .jpeg, .png"
			>
		</form>
	</div>

</template>

<script>
	import VueTypes from 'vue-types';
	import Tooltip from '@/js/atomic/tooltip';
	import {mapState, mapActions} from 'vuex';
	export default {
		name: 'user-profile-icon',
		props: {
			size: VueTypes.number.def(56),
			allowImageUpload: VueTypes.bool.def(false)
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
				profile: state => state.ui.profile,
				user: state => state.user.user
			}),
			style () {
				return {
					width: `${this.size}px`,
					height: `${this.size}px`,
					backgroundImage: `url(${this.user.picture})`
				};
			}
		},
		methods: {
			...mapActions([
				'USER_TRANSITION'
			]),
			handleClick () {
				if (this.allowImageUpload) {
					return;
				}
				this.$emit('handleIconClick');
			},
			validFileType (file) {
				const fileTypes = [
					'image/jpeg',
					'image/jpg',
					'image/pjpeg',
					'image/png'
				];
				for (let i = 0; i < fileTypes.length; i++) {
					if (file.type === fileTypes[i]) {
						return true;
					}
				}
				return false;
			},
			createUserSession () {
				return {
					idToken: this.user.idToken,
					accessToken: this.user.accessToken,
					refreshToken: this.user.refreshToken
				};
			},
			handleReadImage (e) {
				const result = e.srcElement.result;
				if (!result) {
					return;
				}
				this.USER_TRANSITION({
					type: 'UPDATE_USER_ATTRIBUTE',
					params: {
						session: this.createUserSession(),
						username: this.user.username,
						attribute: 'picture',
						newValue: result
					}
				});
			},
			handleChange () {
				const input = this.$refs['input'];
				const file = input.files[0];
				const reader = new FileReader();
				reader.addEventListener('load', this.handleReadImage, false);
				if (!file || file.length > 1) {
					return;
				}
				if (!this.validFileType(file)) {
					return;
				}
				reader.readAsDataURL(file);
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
		&__form {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		&__input {
			opacity: 0;
			cursor: pointer;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
</style>
