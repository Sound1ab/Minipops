import axios from 'axios';
import {wantlistMachine} from '@/js/vuex/FSM/wantlistMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {WANTLIST} from '@/js/vuex/api';
import {filterAlphabetically} from '@/js/vuex/filter';
import {removeBrackets} from '@/js/regex/remove-brackets';

export function createPromises (api, releaseIds, user) {
	return releaseIds.map(el => {
		return axios.get(api, {params: {
			user,
			releaseId: el
		}});
	});
}

function initialState () {
	return {
		state: wantlistMachine.initial,
		userId: '',
		items: []
	};
}

const state = initialState();

const actions = {
	WANTLIST_TRANSITION: transition.bind(null, wantlistMachine),
	FETCH_WANTLIST_DATA ({commit, dispatch}, {params: {user}}) {
		axios.post(WANTLIST.wantlist, {user})
			.then(res => {
				const data = res.data;
				const filteredAlphabetically = filterAlphabetically(data);
				commit('updateWantlistItems', filteredAlphabetically);
				dispatch('WANTLIST_TRANSITION', {type: 'SUCCESS'});
			})
			.catch(() => {
				dispatch('WANTLIST_TRANSITION', {type: 'FAILURE'});
			});
	},
	UPDATE_WANTLIST_DATA ({dispatch}, {
		params: {
			type,
			user = '',
			artist = '',
			album = '',
			spotifyId = '',
			imageUrl = ''
		}}) {
		album = removeBrackets(album);
		axios.post(WANTLIST[type], {user, artist, album, spotifyId, imageUrl})
			.then(() => {
				dispatch('WANTLIST_TRANSITION', {
					type: 'SUCCESS',
					params: {user, artist, album, spotifyId, imageUrl}
				});
			})
			.catch(() => {
				dispatch('WANTLIST_TRANSITION', {type: 'FAILURE'});
			});
	},
	REMOVE_ITEM_FROM_WANTLIST ({commit, state}, {params: {spotifyId}}) {
		const updatedWantlist = state.items.filter(item => {
			return item.spotifyId !== spotifyId;
		});
		commit('updateWantlistItems', updatedWantlist);
	},
	ADD_ITEM_TO_WANTLIST ({commit, state}, {params: {artist, album, spotifyId, imageUrl}}) {
		const wantlist = [...state.items, {artist, album, spotifyId, imageUrl}];
		const filteredAlphabetically = filterAlphabetically(wantlist);
		commit('updateWantlistItems', filteredAlphabetically);
	}
};

const mutations = {
	updateWantlistState (state, nextState) {
		state.state = nextState;
	},
	updateUserId (state, userId) {
		state.userId = userId;
	},
	updateWantlistItems (state, data) {
		state.items = data;
	},
	updateAuthPref (state, payload) {
		state.authPref = payload;
	},
	resetStateData (state) {
		let newState = initialState();
		state = Object.assign(state, newState);
	}
};

const getters = {
	wantlistTitles: (state) => {
		// if (state.items.length > 0) {
		// 	return state.items.map(el => {
		// 		const sanitised = removePunctuation(el.title);
		// 		const words = sanitised.split(' ');
		// 		return returnAllPhrasesContainingPhrase(words);
		// 	});
		// }
	},
	wantlistIds: (state) => {
		if (state.items.length <= 0) {
			return state.items;
		}
		return state.items.map(el => el.spotifyId);
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
