import axios from 'axios';
import {fetchMachine} from '@/js/vuex/FSM/fetchMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {ITEMS} from '@/js/vuex/api';
import {removeBrackets} from '@/js/regex/remove-brackets';
import {normalizer} from '@/js/vuex/normalizer';
import {filter, filterKeys} from '@/js/vuex/filter';
import {returnAllPhrasesContainingPhrase} from '@/js/regex/return-all-phrases-containing-phrase';
import {toFixed} from '@/js/regex/to-fixed';
import Router from '@/js/router/index.js';

function initialState () {
	return {
		state: fetchMachine.initial,
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
		artist: {
			items: [],
			query: ''
		},
		discovery: {
			items: [],
			query: ''
		},
		'artist-releases': {
			items: [],
			query: ''
		},
		sort: filterKeys.priceLowHigh
	};
}

const state = initialState();

const actions = {
	FETCH_TRANSITION: transition.bind(null, fetchMachine),
	CREATE_CANCEL_TOKEN ({commit, dispatch}, {params}) {
		let CancelToken = axios.CancelToken;
		let source = CancelToken.source();
		commit('createCancelToken', source);
		dispatch('FETCH_TRANSITION', {type: 'TOKEN_CREATED', params});
	},
	CANCEL_OUTGOING_REQUEST ({state}) {
		if (state.cancelToken) {
			state.cancelToken.cancel();
		}
	},
	CHECKING_TAB ({dispatch}, {params: {type, query, tab, user}}) {
		if (tab === 'artist-releases' && (type === 'SEARCH_DISPATCH' || type === 'WANTLIST_DISPATCH')) {
			Router.push({path: '/discovery'});
			tab = 'discovery';
		}
		dispatch('FETCH_TRANSITION', {
			type: 'TAB_CHECKED',
			params: {
				query,
				tab,
				user
			}
		});
	},
	FETCH_DATA ({commit, dispatch, state}, {params: {query, tab, user}}) {
		const keywords = encodeURIComponent(removeBrackets(query));
		axios.get(ITEMS[tab], {params: {keywords, user}, cancelToken: state.cancelToken.token})
			.then(res => {
				if (res.data && res.data.length > 0) {
					let data = normalizer[tab](res.data);
					commit('updateItems', {type: tab, data, query: keywords});
					dispatch('FETCH_TRANSITION', {type: 'SUCCESS'});
				} else {
					commit('updateItems', {type: tab, data: [], query: keywords});
					dispatch('FETCH_TRANSITION', {type: 'FAILURE'});
				}
			})
			.catch((err) => {
				if (err.message === 'Request failed with status code 400') {
					dispatch('FETCH_TRANSITION', {type: 'FAILURE'});
				} else {
					dispatch('FETCH_TRANSITION', {type: 'SUCCESS'});
				}
				commit('updateItems', {type: tab, data: [], query: keywords});
			});
	},
	SORT ({commit}, payload) {
		commit('sort', payload);
	}
};

const mutations = {
	updateFetchState (state, nextState) {
		state.state = nextState;
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
	},
	resetStateData (state) {
		let newState = initialState();
		state = Object.assign(state, newState);
	}
};

const getters = {
	cleanItems: (state, getters, rootState) => {
		const tab = rootState.toggle.state;
		if (state[tab] && state[tab].items && state[tab].items.length > 0) {
			return state[tab].items;
		}
	},
	sortItems: (state, getters, rootState) => {
		const tab = rootState.toggle.state;
		if (state[tab] && state[tab].items && state[tab].items.length > 0) {
			return filter[state.sort](state[tab].items);
		}
	},
	averagePrice: (state, getters, rootState) => {
		const tab = rootState.toggle.state;
		if (!state[tab] || !state[tab].items || state[tab].items.length <= 1 || tab === 'artist-releases' || tab === 'discovery') {
			return;
		}
		const queryWithBracketsRemoved = removeBrackets(rootState.search.query);
		const query = queryWithBracketsRemoved.split(' ');
		const regex = returnAllPhrasesContainingPhrase(query);
		const items = state[tab].items.filter(el => {
			return (el.title).search(regex) >= 0;
		});
		if (!query || !regex || items.length <= 0) {
			return;
		}
		const accumlatedCost = items.reduce((acc, el) => {
			return ((acc * 100) + (parseFloat(el.price) * 100)) / 100;
		}, 0);
		const average = ((accumlatedCost * 100) / items.length) / 100;
		return toFixed(average, 2);
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
