import axios from 'axios';
import {wantlistMachine} from '@/js/vuex/FSM/wantlistMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {saveToLocalStorage, getFromLocalStorage, removeItemFromLocalStorage} from '@/js/helpers/localStorage';
import {WANTLIST} from '@/js/vuex/api';
import {refineWantlist, extractReleaseId, refineReleases} from '@/js/vuex/normalizer';
import {removePunctuation} from '@/js/filters/removePunctuation';
import {filterAlphabetically} from '@/js/vuex/filter';

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
	items: {},
	authPref: !!getFromLocalStorage('vcollect_doesNotWantToAuthenticate'),
	confirmation: {
		state: false,
		value: ''
	}
};

const actions = {
	WANTLIST_TRANSITION: transition.bind(null, wantlistMachine),
	CHECK_AUTHENTICATION ({dispatch, rootState}) {
		axios.post(WANTLIST.accessData, {user: rootState.user.user})
			.then(res => {
				const data = res.data;
				if (data.success) {
					dispatch('WANTLIST_TRANSITION', {type: 'SUCCESS'});
				} else {
					dispatch('WANTLIST_TRANSITION', {type: 'FAILURE'});
				}
			})
			.catch(err => {
				console.log(err);
				dispatch('WANTLIST_TRANSITION', {type: 'FAILURE'});
			});
	},
	SAVE_AUTHENTICATION_PREFERENCE ({commit, dispatch}, {params: {preference}}) {
		if (preference) {
			removeItemFromLocalStorage('vcollect_doesNotWantToAuthenticate');
			commit('updateAuthPref', false);
		} else {
			saveToLocalStorage('vcollect_doesNotWantToAuthenticate', true);
			commit('updateAuthPref', true);
		}
	},
	REDIRECT ({rootState}) {
		const user = rootState.user.user;
		window.location.replace(`https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/authorize?user=${user}`);
	},
	UPDATE_USER_ID ({commit, dispatch}, payload) {
		commit('updateUserId', payload);
	},
	FETCH_WANTLIST_DATA ({commit, dispatch, rootState}) {
		axios.get(WANTLIST.wantlist, {params: {user: rootState.user.user}})
			.then(res => {
				const refinedWantlist = refineWantlist(res.data.wants);
				const filteredAlphabetically = filterAlphabetically(refinedWantlist);
				commit('updateWantlistItems', filteredAlphabetically);
				dispatch('WANTLIST_TRANSITION', {type: 'SUCCESS'});
			})
			.catch(() => {
				dispatch('WANTLIST_TRANSITION', {type: 'FAILURE'});
			});
	},
	FETCH_RELEASE_DATA ({commit, dispatch, state, rootState}) {
		const releaseIds = extractReleaseId(state.items);
		const promises = createPromises(WANTLIST.releases, releaseIds, rootState.user.user);
		axios.all(promises)
			.then(res => {
				const refinedReleases = refineReleases(res);
				commit('updateWantlistItems', refinedReleases);
				dispatch('WANTLIST_TRANSITION', {type: 'SUCCESS_RELEASES'});
			})
			.catch(() => {
				dispatch('WANTLIST_TRANSITION', {type: 'FAILURE_RELEASES'});
			});
	},
	UPDATE_WANTLIST_DATA ({rootState, dispatch}, {
		params: {
			type,
			releaseId = '',
			keywords = '',
			title = ''
		}}) {
		const sanitisedKeywords = keywords ? removePunctuation(keywords) : '';
		axios.get(WANTLIST[type], {
			params: {
				user: rootState.user.user,
				releaseId,
				keywords:
				sanitisedKeywords,
				title
			}})
			.then(() => {
				dispatch('WANTLIST_TRANSITION', {
					type: 'SUCCESS',
					params: {
						type,
						releaseId,
						keywords
					}
				});
			})
			.catch(() => {
				dispatch('WANTLIST_TRANSITION', {type: 'FAILURE'});
			});
	},
	REMOVE_ITEM_FROM_WANTLIST ({commit, dispatch, state}, {params: {releaseId}}) {
		const updatedWantlist = state.items.filter(item => {
			return item.id !== releaseId;
		});
		commit('updateWantlistItems', updatedWantlist);
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

function createRegex (words) {
	return words.map(el => {
		return `(?=.*\\b${el}\\b)`;
	}).join('');
}

const getters = {
	wantlistTitles: (state) => {
		if (state.items.length > 0) {
			return state.items.map(el => {
				let words = el.title.split(' ');
				return new RegExp(`^${createRegex(words)}.*$`, 'gi');
			});
		}
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
