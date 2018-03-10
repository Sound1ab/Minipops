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
	SEND_SPOTIFY_ID ({dispatch}, {type, params: {user, keywords, spotifyId}}) {
		axios.post(SUBSCRIBE[type], {
			user,
			keywords,
			spotifyId
		})
			.then(res => {
				dispatch('WATCH_TRANSITION', {type: 'SUCCESS', params: {spotifyId}});
			})
			.catch(() => {
				dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
			});
	},
	RETRIEVE_WATCHERS ({commit, dispatch}, {type, params: {user}}) {
		if (!user) {
			dispatch('WATCH_TRANSITION', {type: 'FAILURE'});
		}
		axios.get(SUBSCRIBE[type], {params: {user}})
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
	ADD_ITEM_TO_WATCHERS ({commit, state}, {params: {spotifyId}}) {
		const {watchers} = state;
		if (watchers.includes(spotifyId)) {
			return;
		}
		commit('updateWatchers', [...watchers, spotifyId]);
	},
	REMOVE_ITEM_FROM_WATCHERS ({commit, state}, {params: {spotifyId}}) {
		const {watchers} = state;
		const updatedWatchers = watchers.filter(el => {
			return el !== spotifyId;
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
