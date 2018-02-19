import axios from 'axios';
import {fetchMachine} from '@/js/vuex/FSM/fetchMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {ITEMS} from '@/js/vuex/api';
import {removePunctuation} from '@/js/filters/removePunctuation';
import {normalizer} from '@/js/vuex/normalizer';
import {filter, filterKeys} from '@/js/vuex/filter';

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
	'related-artists': {
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
	FETCH_DATA ({commit, rootState, dispatch, state}, {params}) {
		const currentTab = rootState.toggle.state;
		const keywords = removePunctuation(rootState.search.query);
		const user = rootState.user.user || '';
		axios.get(ITEMS[currentTab], {params: {keywords, user}, cancelToken: state.cancelToken.token})
			.then(res => {
				if (res.data) {
					let data = normalizer[currentTab](res.data);
					commit('updateItems', {type: currentTab, data, query: keywords});
					dispatch('FETCH_TRANSITION', {type: 'SUCCESS'});
				} else {
					commit('updateItems', {type: currentTab, data: [], query: keywords});
					dispatch('FETCH_TRANSITION', {type: 'FAILURE'});
					throw new Error('no results returned');
				}
			})
			.catch((err) => {
				commit('updateItems', {type: currentTab, data: [], query: keywords});
				dispatch('FETCH_TRANSITION', {type: 'FAILURE'});
				throw new Error(err);
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
