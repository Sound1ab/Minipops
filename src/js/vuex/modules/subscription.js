import axios from 'axios';
import {subscriptionMachine} from '@/js/vuex/FSM/subscriptionMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {SUBSCRIBE} from '@/js/vuex/api';
import {urlB64ToUint8Array} from '@/js/helpers/url-b64-to-uint8-array';

const applicationServerPublicKey = 'BE35Wp0YzOV61vfK3JX5QcUHkUqNd7ZUFB_sGt12v9eyBAAZIIeXMvFn0noCwvBCUmBAxJFMbmiLsR4jpQzIy_g';

const state = {
	state: subscriptionMachine.initial,
	registration: null
};

const actions = {
	SUBSCRIPTION_TRANSITION: transition.bind(null, subscriptionMachine),
	CHECKING_FOR_SERVICE ({commit, dispatch}) {
		if (!('serviceWorker' in navigator)) {
			console.log('cancelling service worker install');
			dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
			return;
		}
		navigator.serviceWorker.ready
			.then((res) => {
				console.log('service worker ready', res);
				commit('saveServiceRegistration', res);
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS'});
			})
			.catch((err) => {
				console.log('service worker NOT ready', err);
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
			});
	},
	CHECK_FOR_NOTIFICATION ({dispatch}) {
		if (Notification.permission === 'granted') {
			dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS'});
		} else {
			Notification.requestPermission(status => {
				if (status === 'granted') {
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS'});
				} else {
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
				}
			});
		}
	},
	CHECK_FOR_SUBSCRIPTION ({dispatch, state}) {
		const registration = state.registration;
		registration.pushManager.getSubscription()
			.then(subscription => {
				const isSubscribed = !(subscription === null);
				if (isSubscribed) {
					console.log('User IS subscribed.');
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS', params: {type: 'saveSubscription', subscription}});
				} else {
					console.log('User is NOT subscribed.');
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
				}
			});
	},
	SUBSCRIBE_USER ({dispatch, state}) {
		const registration = state.registration;
		const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
		registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		})
			.then(subscription => {
				if (!subscription) {
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
				}
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS', params: {type: 'saveSubscription', subscription}});
			})
			.catch((err) => {
				console.log('Failed to subscribe the user: ', err);
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
			});
	},
	UNSUBSCRIBE_USER ({dispatch, state}) {
		const registration = state.registration;
		registration.pushManager.getSubscription()
			.then(subscription => {
				if (subscription) {
					subscription.unsubscribe();
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS', params: {type: 'removeSubscription', subscription}});
				}
			})
			.catch(function (error) {
				console.log('Error unsubscribing', error);
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
			});
	},
	UPDATE_SUBSCRIPTION_ON_SERVER ({dispatch, rootState}, {params: {type, subscription}}) {
		axios.post(SUBSCRIBE[type], {subscription, user: rootState.user.user})
			.then(response => {
				if (!response.ok) {
					dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
				}
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'SUCCESS'});
			})
			.catch(err => {
				console.log(err);
				dispatch('SUBSCRIPTION_TRANSITION', {type: 'FAILURE'});
			});
	}
};

const mutations = {
	updateSubscriptionState (state, nextState) {
		state.state = nextState;
	},
	saveServiceRegistration (state, registration) {
		state.registration = registration;
	}
};

export default {
	state,
	mutations,
	actions
};
