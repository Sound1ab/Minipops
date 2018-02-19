import axios from 'axios';
import {userMachine} from '@/js/vuex/FSM/userMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {getFromLocalStorage, saveToLocalStorage} from '@/js/helpers/localStorage';
import {USER} from '@/js/vuex/api';

const state = {
	state: userMachine.initial,
	user: null
};

const actions = {
	USER_TRANSITION: transition.bind(null, userMachine),
	CHECKING_FOR_USER ({dispatch}) {
		const user = getFromLocalStorage('vcollect_userId');
		if (user) {
			dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {user}});
		} else {
			dispatch('USER_TRANSITION', {type: 'FAILURE'});
		}
	},
	CREATE_USER ({dispatch}) {
		axios.get(USER.addUser)
			.then(res => {
				const user = res.data.user;
				saveToLocalStorage('vcollect_userId', user);
				dispatch('USER_TRANSITION', {type: 'SUCCESS'});
			})
			.catch(() => {
				dispatch('USER_TRANSITION', {type: 'FAILURE'});
			});
	},
	STORE_USER ({commit, dispatch}, {params: {user}}) {
		commit('storeUser', user);
		dispatch('USER_TRANSITION', {type: 'USER_STORED'});
	}
};

const mutations = {
	updateUserState (state, nextState) {
		state.state = nextState;
	},
	storeUser (state, user) {
		state.user = user;
	}
};

export default {
	state,
	mutations,
	actions
};
