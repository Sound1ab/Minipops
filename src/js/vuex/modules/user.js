import axios from 'axios';
import {userMachine} from '@/js/vuex/FSM/userMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {getFromLocalStorage, saveToLocalStorage, removeItemFromLocalStorage} from '@/js/helpers/localStorage';
import {COGNITO} from '@/js/vuex/api';
import Router from '@/js/router/index';
import jwtDecode from 'jwt-decode';
const lodashGet = require('lodash/get');

const routes = {
	waitingForLogin: '/login',
	waitingForRegistration: '/login/registration',
	waitingForVerification: '/login/verification',
	waitingForPasswordReset: '/login/forgot-password-reset',
	waitingForPasswordVerification: '/login/forgot-password-verification'
};

const state = {
	state: userMachine.initial,
	user: {
		jwt: '',
		username: '',
		email: ''
	}
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
	STORE_USER_IN_STATE ({commit}, {params: {user = '', rememberMe = false}}) {
		if (rememberMe) {
			saveToLocalStorage('vcollect_userId', user);
		}
		const decodedJwt = jwtDecode(user);
		commit('storeUser', {
			jwt: user,
			username: decodedJwt['cognito:username'],
			email: decodedJwt.email
		});
	},
	REMOVE_USER_FROM_LOCAL_STORE ({dispatch}) {
		const user = getFromLocalStorage('vcollect_userId');
		if (user) {
			removeItemFromLocalStorage('vcollect_userId');
		}
		dispatch('USER_TRANSITION', {type: 'SUCCESS'});
	},
	UPDATE_ROUTE ({state}, {params: {path = ''} = {}}) {
		let nextPath;
		if (path) {
			nextPath = path;
		} else {
			nextPath = routes[state.state];
		}
		if (!nextPath) {
			return;
		}
		Router.push({path: nextPath});
	},
	COGNITO_REQUEST ({dispatch}, {type, params: {path = '', emailAddress = '', username = '', password = '', verification = '', rememberMe = false}}) {
		axios.post(COGNITO[type], {
			emailAddress,
			username,
			password,
			verification,
			type
		})
			.then(res => {
				if (res.data.code) {
					console.log('err:', res.data.message);
					const message = res.data.message;
					dispatch('USER_TRANSITION', {type: 'FAILURE', params: {message}});
				}
				if (type === 'LOGIN' && !res.data.user) {
					dispatch('USER_TRANSITION', {type: 'FAILURE'});
				}
				const {user = ''} = res.data;
				dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {user, path, rememberMe}});
			})
			.catch((err) => {
				let message = 'Something\'s not quite right here';
				if (lodashGet(err, 'response.data.message')) {
					message = err.response.data.message;
				}
				dispatch('USER_TRANSITION', {type: 'FAILURE', params: {message}});
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
