import axios from 'axios';
import {fetchMachine} from '@/js/vuex/FSM/fetchMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {ITEMS} from '@/js/vuex/api';
import {addSlashes} from '@/js/regex/add-slashes';
import {normalizer} from '@/js/vuex/normalizer';
import {filter, filterKeys} from '@/js/vuex/filter';
import {returnAllPhrasesContainingPhrase} from '@/js/regex/return-all-phrases-containing-phrase';
import {toFixed} from '@/js/regex/to-fixed';

const state = {
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
	FETCH_DATA ({commit, rootState, dispatch, state}, {params: {query}}) {
		const currentTab = rootState.toggle.state;
		const keywords = addSlashes(query);
		console.log('keywords', keywords);
		const user = rootState.user.user.jwt || '';
		axios.get(ITEMS[currentTab], {params: {keywords, user}, cancelToken: state.cancelToken.token})
			.then(res => {
				if (res.data) {
					let data = normalizer[currentTab](res.data);
					commit('updateItems', {type: currentTab, data, query: keywords});
					dispatch('FETCH_TRANSITION', {type: 'SUCCESS'});
				} else {
					commit('updateItems', {type: currentTab, data: [], query: keywords});
					dispatch('FETCH_TRANSITION', {type: 'FAILURE'});
				}
			})
			.catch((err) => {
				if (err.message === 'Request failed with status code 400') {
					dispatch('FETCH_TRANSITION', {type: 'FAILURE'});
				} else {
					dispatch('FETCH_TRANSITION', {type: 'SUCCESS'});
				}
				commit('updateItems', {type: currentTab, data: [], query: keywords});
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
		if (!state[tab] || state[tab].items || state[tab].items.length <= 1 || tab === 'artist-releases' || tab === 'discovery') {
			return;
		}
		const query = rootState.search.query.split(' ');
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
