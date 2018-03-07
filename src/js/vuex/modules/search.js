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
	START_TIMER ({dispatch}, {params}) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch('SEARCH_TRANSITION', {
				type: 'TIMER_COUNTDOWN_PASSED',
				params
			});
		}, 500);
	},
	UPDATE_SEARCH ({commit}, {params: {query = ''}}) {
		commit('updateSearch', query);
	},
	DISPATCHING_SEARCH ({dispatch}, {params}) {
		dispatch('FETCH_TRANSITION', {
			type: 'FETCH_DATA_REQUEST',
			params
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
