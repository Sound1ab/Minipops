import axios from 'axios';
import {userMachine} from '@/js/vuex/FSM/userMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {getFromLocalStorage, saveToLocalStorage} from '@/js/helpers/localStorage';
import {COGNITO} from '@/js/vuex/api';
import Router from '@/js/router/index';

const state = {
	state: userMachine.initial,
	user: null
};

const actions = {
	USER_TRANSITION: transition.bind(null, userMachine),
	CHECKING_FOR_USER ({dispatch}) {
		const user = getFromLocalStorage('vcollect_userId');
		if (user) {
			dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {user, path: '/current'}});
		} else {
			dispatch('USER_TRANSITION', {type: 'FAILURE', params: {path: '/login'}});
		}
	},
	STORE_USER_IN_STATE ({commit}, {params: {user}}) {
		saveToLocalStorage('vcollect_userId', user);
		commit('storeUser', user);
	},
	UPDATE_ROUTE ({dispatch}, {params: {path}}) {
		Router.push({path});
	},
	COGNITO_REQUEST ({dispatch}, {type, params: {emailAddress = '', username = '', password = '', verification = ''}}) {
		let path;
		if (type === 'LOGIN') {
			path = '/current';
		} else if (type === 'REGISTER_USER') {
			path = '/login/verification';
		} else if (type === 'VERIFY') {
			path = '/login';
		}
		axios.post(COGNITO[type], {
			emailAddress,
			username,
			password,
			verification
		})
			.then(res => {
				console.log(res);
				if (res.data.code) {
					console.log('err:', res.data.code);
					dispatch('USER_TRANSITION', {type: 'FAILURE'});
				}
				if (type === 'LOGIN' && !res.data.user) {
					dispatch('USER_TRANSITION', {type: 'FAILURE'});
				}
				const {user = ''} = res.data;
				dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {user, path}});
			})
			.catch(() => {
				dispatch('USER_TRANSITION', {type: 'FAILURE'});
			});
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
