import {searchMachine} from '@/js/vuex/FSM/searchMachine';
import {transition} from '@/js/vuex/fsm-transition';
import Router from '@/js/router/index.js';

let timeout;

const state = {
	state: searchMachine.initial,
	query: '',
	id: null
};

const actions = {
	SEARCH_TRANSITION: transition.bind(null, searchMachine),
	START_TIMER ({dispatch}, {params: {query = '', disableFetch = false, tab}}) {
		if (!query || disableFetch) {
			dispatch('SEARCH_TRANSITION', {type: 'TEXT_INPUT_EMPTY'});
			return;
		}
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch('SEARCH_TRANSITION', {
				type: 'TIMER_COUNTDOWN_PASSED',
				params: {
					query,
					tab
				}
			});
		}, 500);
	},
	UPDATE_SEARCH ({commit}, {params: {query = ''}}) {
		commit('updateSearch', query);
	},
	CHECKING_TAB ({dispatch}, {params: {query, tab}}) {
		if (tab === 'artist-releases') {
			Router.push({path: '/discovery'});
			tab = 'discovery';
		}
		dispatch('SEARCH_TRANSITION', {
			type: 'TAB_CHECKED',
			params: {
				query,
				tab
			}
		});
	},
	DISPATCHING_SEARCH ({dispatch, rootState}, {params: {query, tab}}) {
		const user = rootState.user.user.idToken;
		dispatch('FETCH_TRANSITION', {
			type: 'FETCH_DATA_REQUEST',
			params: {
				query,
				tab,
				user
			}
		});
		dispatch('SEARCH_TRANSITION', {type: 'SEARCH_DISPATCHED'});
	}
};

const mutations = {
	updateSearchState (state, nextState) {
		state.state = nextState;
	},
	updateSearch (state, query) {
		state.query = query;
	}
};

export default {
	state,
	mutations,
	actions
};
