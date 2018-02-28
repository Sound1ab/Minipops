import axios from 'axios';
import {wantlistMachine} from '@/js/vuex/FSM/wantlistMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {saveToLocalStorage, getFromLocalStorage, removeItemFromLocalStorage} from '@/js/helpers/localStorage';
import {WANTLIST} from '@/js/vuex/api';
import {refineWantlist, extractReleaseId, refineReleases} from '@/js/vuex/normalizer';
import {addSlashes} from '@/js/regex/add-slashes';
import {removeBrackets} from '@/js/regex/remove-brackets';
import {removePunctuation} from '@/js/regex/removePunctuation';
import {filterAlphabetically} from '@/js/vuex/filter';
import {returnAllPhrasesContainingPhrase} from '@/js/regex/return-all-phrases-containing-phrase';

export function createPromises (api, releaseIds, user) {
	return releaseIds.map(el => {
		return axios.get(api, {params: {
			user,
			releaseId: el
		}});
	});
}

const state = {
	state: wantlistMachine.initial,
	userId: '',
	items: [],
	authPref: !!getFromLocalStorage('vcollect_doesNotWantToAuthenticate'),
	confirmation: {
		state: false,
		value: ''
	}
};

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
		artist = artist ? addSlashes(artist) : '';
		album = artist ? addSlashes(album) : '';
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
	},
	SHOW_CONFIRMATION ({commit}, payload) {
		commit('showConfirmation', {state: true, value: payload.type === 'SUCCESS'});
		setTimeout(() => {
			commit('showConfirmation', {state: false, value: ''});
		}, 1000);
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
	showConfirmation (state, payload) {
		state.confirmation = payload;
	},
	updateAuthPref (state, payload) {
		state.authPref = payload;
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
