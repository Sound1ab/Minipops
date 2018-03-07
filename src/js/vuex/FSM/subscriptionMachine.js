import {Machine} from 'xstate';

const id = 'Subscription';

export const subscriptionMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				LOADED: 'checkingForServiceWorker'
			}
		},
		checkingForServiceWorker: {
			onEntry: ['CHECKING_FOR_SERVICE_WORKER'],
			on: {
				SUCCESS: 'checkingForNotification',
				FAILURE: 'idle'
			}
		},
		checkingForNotification: {
			onEntry: ['CHECK_FOR_NOTIFICATION'],
			on: {
				SUCCESS: 'checkingForSubscription',
				FAILURE: 'idle'
			}
		},
		checkingForSubscription: {
			onEntry: ['CHECK_FOR_SUBSCRIPTION'],
			on: {
				SUCCESS: 'updatingSubscriptionOnServer',
				FAILURE: 'subscribingUser'
			}
		},
		subscribingUser: {
			onEntry: ['SUBSCRIBE_USER'],
			on: {
				SUCCESS: 'updatingSubscriptionOnServer',
				FAILURE: 'idle'
			}
		},
		unsubscribingUser: {
			onEntry: ['UNSUBSCRIBE_USER'],
			on: {
				SUCCESS: 'updatingSubscriptionOnServer',
				FAILURE: 'idle'
			}
		},
		updatingSubscriptionOnServer: {
			onEntry: ['UPDATE_SUBSCRIPTION_ON_SERVER'],
			on: {
				SUCCESS: 'subscriptionReady',
				FAILURE: 'idle'
			}
		},
		subscriptionReady: {
			onEntry: ['SUBSCRIPTION_READY']
		}
	}
});
