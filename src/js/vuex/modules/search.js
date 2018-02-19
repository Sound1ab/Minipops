import {searchMachine} from '@/js/vuex/FSM/searchMachine';
import {transition} from '@/js/vuex/fsm-transition';

let timeout;

const state = {
	state: searchMachine.initial,
	query: '',
	id: null
};

const actions = {
	SEARCH_TRANSITION: transition.bind(null, searchMachine),
	START_TIMER ({dispatch}, transitionInfo) {
		const {params: {query = '', disableFetch = false}} = transitionInfo;
		dispatch('UPDATE_SEARCH', transitionInfo);
		if (!query || disableFetch) {
			dispatch('SEARCH_TRANSITION', {type: 'TEXT_INPUT_EMPTY'});
			return;
		}
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch('SEARCH_TRANSITION', {type: 'TIMER_COUNTDOWN_PASSED'});
		}, 500);
	},
	UPDATE_SEARCH ({commit}, {params: {query}}) {
		commit('updateSearch', query);
	},
	DISPATCHING_SEARCH ({dispatch, state, rootState}) {
		const query = state.query;
		const tab = rootState.toggle.state;
		const routeEnteringQuery = rootState.fetch[tab].query;
		dispatch('FETCH_TRANSITION', {
			type: 'FETCH_DATA_REQUEST',
			extState: {
				query,
				routeEnteringQuery
			}
		});
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
