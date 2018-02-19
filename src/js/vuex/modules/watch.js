import axios from 'axios';
import {watchMachine} from '@/js/vuex/FSM/watchMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {SUBSCRIBE} from '@/js/vuex/api';

const state = {
	state: watchMachine.initial,
	subscribeId: undefined,
	watchers: []
};

const actions = {
	WATCH_TRANSITION: transition.bind(null, watchMachine),
	POST_EBAY_ID ({commit, dispatch, rootState}, {type, params: {title}}) {
		let API;
		const user = rootState.user.user;
		if (!user) {
			dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
		}
		if (type === 'WATCH') {
			API = SUBSCRIBE.watch;
		} else {
			API = SUBSCRIBE.removeWatch;
		}
		axios.post(API, {
			title,
			user
		})
			.then(res => {
				dispatch('WATCH_TRANSITION', {type: 'SUCCESS', params: {title}});
			})
			.catch(err => {
				console.log(err);
				dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
			});
	},
	RETRIEVE_WATCHERS ({commit, dispatch, rootState}) {
		const user = rootState.user.user;
		if (!user) {
			dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
		}
		axios.get(SUBSCRIBE.retrieveWatchers, {params: {user}})
			.then(res => {
				const data = res.data;
				if (Array.isArray(data)) {
					commit('updateWatchers', data);
					dispatch('WATCH_TRANSITION', {type: 'SUCCESS'});
				} else {
					dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
				}
			})
			.catch(() => {
				dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
			});
	},
	ADD_ITEM_TO_WATCHERS ({commit, state}, {params: {title}}) {
		console.log('add to watchers', title);
		const {watchers} = state;
		if (watchers.includes(title)) {
			return;
		}
		commit('updateWatchers', [...watchers, title]);
	},
	REMOVE_ITEM_FROM_WATCHERS ({commit, state}, {params: {title}}) {
		const {watchers} = state;
		const updatedWatchers = watchers.filter(el => {
			return el !== title;
		});
		commit('updateWatchers', updatedWatchers);
	}
};

const mutations = {
	updateWatchState (state, nextState) {
		state.state = nextState;
	},
	saveSubscribeId (state, subscribeId) {
		state.subscribeId = subscribeId;
	},
	updateWatchers (state, watchers) {
		state.watchers = watchers;
	}
};

export default {
	state,
	mutations,
	actions
};
