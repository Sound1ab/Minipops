import {Machine} from 'xstate';

const id = 'User';

export const userMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				LOADED: 'checkingForUser'
			}
		},
		checkingForUser: {
			onEntry: ['CHECKING_FOR_USER'],
			on: {
				SUCCESS: 'successfullyLoggedIn',
				FAILURE: 'waitingForLogin'
			}
		},
		waitingForLogin: {
			onEntry: ['UPDATE_ROUTE'],
			on: {
				LOGIN: 'loggingIn',
				REGISTER_USER: 'waitingForRegistration',
				FORGOT_PASSWORD: 'waitingForPasswordReset'
			}
		},
		waitingForRegistration: {
			onEntry: ['UPDATE_ROUTE'],
			on: {
				LOGIN: 'waitingForLogin',
				REGISTER_USER: 'registeringUser',
				VERIFY_REGISTRATION: 'waitingForVerification'
			}
		},
		waitingForVerification: {
			onEntry: ['UPDATE_ROUTE'],
			on: {
				VERIFY_USER: 'confirmingVerification',
				LOGIN: 'waitingForLogin',
				REGISTER_USER: 'waitingForRegistration'
			}
		},
		waitingForPasswordReset: {
			onEntry: ['UPDATE_ROUTE'],
			on: {
				RESET: 'waitingForPasswordVerification',
				LOGIN: 'waitingForLogin'
			}
		},
		waitingForPasswordVerification: {
			onEntry: ['COGNITO_REQUEST', 'UPDATE_ROUTE'],
			on: {
				VERIFY_RESET: 'confirmingPasswordVerification',
				LOGIN: 'waitingForLogin'
			}
		},
		loggingIn: {
			onEntry: ['COGNITO_REQUEST', 'SHOW_LOADING'],
			on: {
				SUCCESS: {
					successfullyLoggedIn: {
						actions: ['UPDATE_ROUTE']
					}
				},
				FAILURE: {
					waitingForLogin: {
						actions: ['SHOW_CONFIRMATION']
					}
				}
			},
			onExit: ['HIDE_LOADING']
		},
		registeringUser: {
			onEntry: ['COGNITO_REQUEST', 'SHOW_LOADING'],
			on: {
				SUCCESS: 'waitingForVerification',
				FAILURE: {
					waitingForRegistration: {
						actions: ['SHOW_CONFIRMATION']
					}
				}
			},
			onExit: ['HIDE_LOADING']
		},
		confirmingVerification: {
			onEntry: ['COGNITO_REQUEST', 'SHOW_LOADING'],
			on: {
				SUCCESS: 'waitingForLogin',
				FAILURE: {
					waitingForVerification: {
						actions: ['SHOW_CONFIRMATION']
					}
				}
			},
			onExit: ['HIDE_LOADING']
		},
		confirmingPasswordVerification: {
			onEntry: ['COGNITO_REQUEST', 'SHOW_LOADING'],
			on: {
				SUCCESS: 'waitingForLogin',
				FAILURE: {
					waitingForVerification: {
						actions: ['SHOW_CONFIRMATION']
					}
				}
			},
			onExit: ['HIDE_LOADING']
		},
		storingLogin: {
			on: {
				SUCCESS: 'loggingIn',
				FAILURE: 'waitingForLogin'
			}
		},
		successfullyLoggedIn: {
			onEntry: ['UPDATE_ROUTE', 'STORE_USER_IN_STATE']
		}
	}
});
