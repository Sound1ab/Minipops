<template>
	<div id="user-profile" class="user-profile" :class="{'user-profile--active': open}">
		<div class="user-profile__heading">
			<close-button
				:color="'white'"
				@closeClick="handleClose"
			>
			</close-button>
			<main-heading
				:text="'Profile'"
				:color="'white'"
				:className="'gamma'"
			>
			</main-heading>
		</div>
		<scrolling-container class="user-profile__details">
			<user-profile-icon
				class="user-profile__icon"
				:size="160"
				:allow-image-upload="true"
			></user-profile-icon>
			<main-heading
				class="user-profile__username"
				:text="'Sound1ab'"
				:color="'black'"
				:className="'gamma'"
			>
			</main-heading>
			<hr class="user-profile__border" />
			<h2 class="user-profile__info-heading delta">USERNAME</h2>
			<p class="user-profile__info-detail">{{user.username}}</p>
			<h2 class="user-profile__info-heading delta">EMAIL</h2>
			<p class="user-profile__info-detail">{{user.email}}</p>
			<button @click="handleSignOut" class="user-profile__sign-out">Sign out</button>
		</scrolling-container>
	</div>
</template>

<script>
	import MainHeading from '@/js/atomic/main-heading';
	import CloseButton from '@/js/atomic/close-button';
	import UserProfileIcon from '@/js/atomic/user-profile-icon';
	import ScrollingContainer from '@/js/atomic/scrolling-container';
	import {mapActions, mapState} from 'vuex';
	import {watch} from '@/js/helpers/dismiss-modal';
	export default {
		name: 'user-profile',
		components: {
			MainHeading,
			CloseButton,
			ScrollingContainer,
			UserProfileIcon
		},
		computed: {
			...mapState({
				open: state => state.ui.profile,
				user: state => state.user.user
			})
		},
		methods: {
			...mapActions([
				'USER_TRANSITION',
				'TOGGLE_PROFILE'
			]),
			handleClose () {
				this.TOGGLE_PROFILE(false);
			},
			handleSignOut () {
				this.TOGGLE_PROFILE(false);
				this.USER_TRANSITION({type: 'SIGN_OUT'});
			}
		},
		watch: {
			open: function (val) {
				if (val) {
					watch('#user-profile', () => {
						this.handleClose();
					});
				}
			}
		}
	};
</script>

<style lang="scss" type="text/scss">
	.user-profile {
		position: absolute;
		width: em(320);
		height: 100%;
		z-index: 0;
		top: 0;
		right: 0;
		opacity: 0;
		transition: opacity .1s;
		transition-delay: 1s;
		background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
		display: flex;
		flex-direction: column;
		pointer-events: none;
		&--active {
			transition-delay: 0s;
			opacity: 1;
			pointer-events: all;
		}
		&__icon {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
		}
		&__heading {
			flex: 0 0 88px;
			background-color: $primaryColour;
			padding: em(16);
			height: em(88);
			color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__details {
			flex: 1 1 100%;
			padding: em(16);
		}
		&__username {
			text-align: center;
			font-weight: bold;
			margin-top: em(16);
		}
		&__border {
			color: lightgrey;
			margin: em(16) 0 0 0;
		}
		&__info-heading {
			color: #242424;
			margin-top: em(16);
		}
		&__info-detail {
			color: #595959;
			font-size: 15px;
			margin-top: em(16);
		}
		&__sign-out {
			background-color: $primaryColour;
			color: $tertiaryColour;
			margin-top: em(16);
			position: relative;
			//left: 50%;
			//transform: translateX(-50%);
			padding: em(16);
		}
	}
</style>
