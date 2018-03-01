export const loginSchema = {
	waitingForLogin: {
		route: '/login',
		build: [
			{
				component: 'loginInput',
				title: 'Username',
				value: 'username',
				type: 'text'
			},
			{
				component: 'loginInput',
				title: 'Password',
				value: 'password',
				type: 'password'
			},
			{
				component: 'forgotPassword'
			},
			{
				component: 'remember',
				value: 'rememberMe'
			},
			{
				component: 'navigateForm',
				schema: {
					border: true,
					heading: 'Not yet registered?',
					children: [
						{
							onClick: 'REGISTER_USER',
							copy: 'Create an account'
						}
					]
				}
			},
			{
				component: 'submitButton'
			}
		],
		next: {
			action: 'LOGIN',
			completionPath: '/current'
		}
	},
	waitingForRegistration: {
		route: '/login/registration',
		build: [
			{
				component: 'loginInput',
				title: 'Username',
				value: 'username',
				type: 'text'
			},
			{
				component: 'loginInput',
				title: 'Email Address',
				value: 'emailAddress',
				type: 'text'
			},
			{
				component: 'loginInput',
				title: 'Password',
				value: 'password',
				type: 'password'
			},
			{
				component: 'navigateForm',
				schema: {
					border: false,
					heading: 'Already registered?',
					children: [
						{
							onClick: 'LOGIN',
							copy: 'Login'
						},
						{
							onClick: 'VERIFY_REGISTRATION',
							copy: 'Verify'
						}
					]
				}
			},
			{
				component: 'submitButton'
			}
		],
		next: {
			action: 'REGISTER_USER',
			completionPath: '/login/verification'
		}
	},
	waitingForVerification: {
		route: '/login/verification',
		build: [
			{
				component: 'loginInput',
				title: 'Username',
				value: 'username',
				type: 'text'
			},
			{
				component: 'loginInput',
				title: 'Verification',
				value: 'verification',
				type: 'text'
			},
			{
				component: 'copy',
				value: 'You will receive a verification code via the email provided. Please enter it above to continue.'
			},
			{
				component: 'navigateForm',
				schema: {
					border: true,
					heading: 'Not what you\'re looking for?',
					children: [
						{
							onClick: 'LOGIN',
							copy: 'Login'
						},
						{
							onClick: 'REGISTER_USER',
							copy: 'Create an account'
						}
					]
				}
			},
			{
				component: 'submitButton'
			}
		],
		next: {
			action: 'VERIFY_USER',
			completionPath: '/login'
		}
	},
	waitingForPasswordReset: {
		route: '/login/forgot-password-reset',
		build: [
			{
				component: 'loginInput',
				title: 'Username',
				value: 'username',
				type: 'text'
			},
			{
				component: 'copy',
				value: 'Please enter your username to reset your password. You\'ll receive and email with a verification code.'
			},
			{
				component: 'navigateForm',
				schema: {
					border: false,
					heading: 'Not what you\'re looking for?',
					children: [
						{
							onClick: 'LOGIN',
							copy: 'Login'
						}
					]
				}
			},
			{
				component: 'submitButton'
			}
		],
		next: {
			action: 'RESET',
			completionPath: '/login/forgot-password-verify'
		}
	},
	waitingForPasswordVerification: {
		route: '/login/forgot-password-verify',
		build: [
			{
				component: 'loginInput',
				title: 'Username',
				value: 'username',
				type: 'text'
			},
			{
				component: 'loginInput',
				title: 'Verification',
				value: 'verification',
				type: 'text'
			},
			{
				component: 'loginInput',
				title: 'New password',
				value: 'password',
				type: 'password'
			},
			{
				component: 'copy',
				value: 'You will receive a verification code via email.'
			},
			{
				component: 'navigateForm',
				schema: {
					border: false,
					heading: 'Not what you\'re looking for?',
					children: [
						{
							onClick: 'LOGIN',
							copy: 'Login'
						}
					]
				}
			},
			{
				component: 'submitButton'
			}
		],
		next: {
			action: 'VERIFY_RESET',
			completionPath: '/login'
		}
	}
};
