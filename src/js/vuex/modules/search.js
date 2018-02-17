import axios from 'axios';
import {searchMachine} from '@/assets/FSM/searchMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {ITEMS} from '@/js/vuex/api';
import {removePunctuation} from '@/js/filters/removePunctuation';
import {normalizer} from '@/js/vuex/normalizer';
import {filter, filterKeys} from '@/js/vuex/filter';

let timeout;

const state = {
	state: searchMachine.initial,
	query: '',
	id: null,
	cancelToken: null,
	current: {
		items: [],
		query: ''
	},
	completed: {
		items: [],
		query: ''
	},
	discogs: {
		items: [],
		query: ''
	},
	'related-artists': {
		items: [],
		query: ''
	},
	sort: filterKeys.priceLowHigh
};

const actions = {
	SEARCH_TRANSITION: transition.bind(null, searchMachine),
	START_TIMER ({dispatch}, {params}) {
		dispatch('UPDATE_SEARCH', params);
		if (!params.query) {
			dispatch('SEARCH_TRANSITION', {type: 'TEXT_INPUT_EMPTY'});
			return;
		}
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch('SEARCH_TRANSITION', {type: 'TIMER_COUNTDOWN_PASSED'});
		}, 500);
	},
	UPDATE_SEARCH ({commit}, payload) {
		commit('updateSearch', payload);
	},
	CREATE_CANCEL_TOKEN ({commit}, payload) {
		let CancelToken = axios.CancelToken;
		let source = CancelToken.source();
		commit('createCancelToken', source);
	},
	CANCEL_OUTGOING_REQUEST ({state}) {
		if (state.cancelToken) {
			state.cancelToken.cancel();
		}
	},
	FETCH_DATA ({commit, rootState, dispatch}, {callback}) {
		const currentTab = rootState.toggle.state.buttonSelected;
		const keywords = removePunctuation(state.query);
		const user = rootState.user.user || '';
		dispatch('CREATE_CANCEL_TOKEN');
		axios.get(ITEMS[currentTab], {params: {keywords, user}, cancelToken: state.cancelToken.token})
			.then(res => {
				if (res.data) {
					let data = normalizer[currentTab](res.data);
					commit('updateItems', {type: currentTab, data, query: state.query});
					dispatch('SEARCH_TRANSITION', {type: 'SUCCESS'});
				} else {
					commit('updateItems', {type: currentTab, data: [], query: state.query});
					dispatch('SEARCH_TRANSITION', {type: 'FAILURE'});
					throw new Error('no results returned');
				}
				if (callback) {
					callback();
				}
			})
			.catch((err) => {
				commit('updateItems', {type: currentTab, data: [], query: state.query});
				dispatch('SEARCH_TRANSITION', {type: 'FAILURE'});
				if (callback) {
					callback();
				}
				throw new Error(err);
			});
	},
	SORT ({commit}, payload) {
		commit('sort', payload);
	}
};

const mutations = {
	updateSearchState (state, nextState) {
		state.state = nextState;
	},
	updateSearch (state, {query, id}) {
		state.query = query;
		state.id = id;
	},
	createCancelToken (state, payload) {
		state.cancelToken = payload;
	},
	updateItems (state, {type, data, query}) {
		state[type].items = data;
		state[type].query = query;
	},
	sort (state, payload) {
		state.sort = payload;
	}
};

const getters = {
	sortItems: (state) => (tab) => {
		return filter[state.sort](state[tab].items);
	},
	averagePrice: state => (tab) => {
		if (state[tab] && state[tab].items && state[tab].items.length > 1) {
			const accumlatedCost = state[tab].items.reduce((acc, secondElement) => {
				if (acc.price) {
					acc = parseFloat(acc.price);
				}
				const secondPrice = parseFloat(secondElement.price);
				const scaleUp = (acc * 100) + (secondPrice * 100);
				const scaleDown = scaleUp / 100;
				return scaleDown;
			});
			const average = ((accumlatedCost * 100) / state[tab].items.length) / 100;
			return average.toFixed(2);
		}
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
