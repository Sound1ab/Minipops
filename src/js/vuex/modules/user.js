import axios from 'axios';
import {userMachine} from '@/js/vuex/FSM/userMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {getFromLocalStorage, saveToLocalStorage, removeItemFromLocalStorage} from '@/js/helpers/localStorage';
import {COGNITO} from '@/js/vuex/api';
import Router from '@/js/router/index';
import jwtDecode from 'jwt-decode';
const lodashGet = require('lodash/get');
const fallbackImage = require('@/assets/images/recollect-icon.png');

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
		idToken: '',
		accessToken: '',
		refreshToken: '',
		username: '',
		email: '',
		picture: fallbackImage
	}
};

const actions = {
	USER_TRANSITION: transition.bind(null, userMachine),
	CHECKING_FOR_USER ({dispatch}) {
		const session = getFromLocalStorage('vcollect_userId');
		if (session) {
			const parsedSession = JSON.parse(session);
			dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {session: parsedSession, path: '/current'}});
		} else {
			dispatch('USER_TRANSITION', {type: 'FAILURE', params: {path: '/login'}});
		}
	},
	STORE_USER_IN_STATE ({commit}, {params: {session = '', rememberMe = false} = {}}) {
		if (!session) {
			return;
		}
		const {idToken, accessToken, refreshToken} = session;
		if (rememberMe) {
			const stringifiedSession = JSON.stringify(session);
			saveToLocalStorage('vcollect_userId', stringifiedSession);
		}
		const decodedJwt = jwtDecode(idToken);
		commit('storeUser', {
			...state.user,
			idToken,
			accessToken,
			refreshToken,
			username: decodedJwt['cognito:username'],
			email: decodedJwt.email,
			picture: decodedJwt['custom:picture'] ? decodedJwt['custom:picture'] : fallbackImage
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
					const message = res.data.message;
					dispatch('USER_TRANSITION', {type: 'FAILURE', params: {message}});
				}
				if (type === 'LOGIN' && !res.data.session) {
					dispatch('USER_TRANSITION', {type: 'FAILURE'});
				}
				const {session = ''} = res.data;
				dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {session, path, rememberMe}});
			})
			.catch((err) => {
				let message = 'Something\'s not quite right here';
				if (lodashGet(err, 'response.data.message')) {
					message = err.response.data.message;
				}
				dispatch('USER_TRANSITION', {type: 'FAILURE', params: {message}});
			});
	},
	UPDATE_USER_ATTRIBUTE ({dispatch}, {type, params: {session, username, attribute, newValue}}) {
		axios.post(COGNITO[type], {session, username, attribute, newValue})
			.then(res => {
				const session = res.data;
				dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {session, rememberMe: true}});
			})
			.catch(() => {
				dispatch('USER_TRANSITION', {type: 'FAILURE'});
			});
	},
	UPDATE_LOCAL_USER_ATTRIBUTE ({commit}, {params: {attribute, newValue}}) {
		commit('updateLocalUserAttribute', {attribute, newValue});
	},
	CHECKING_FOR_EXPIRED_TOKEN ({dispatch}, {params: {session, path}}) {
		const idToken = jwtDecode(session.idToken);
		const username = idToken['cognito:username'];
		const expDate = idToken.exp;
		const dateNow = new Date();
		if (expDate < dateNow) {
			dispatch('USER_TRANSITION', {type: 'TOKEN_EXPIRED', params: {username, session, path}});
			return;
		}
		dispatch('USER_TRANSITION', {type: 'TOKEN_VALID', params: {session, path}});
	},
	REFRESHING_TOKEN ({dispatch}, {type, params: {username, session, path}}) {
		// console.log('params', username);
		// console.log('params', session);
		dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {username, session, path}});
		// axios.post(COGNITO[type], {session, username})
		// 	.then(res => {
		// 		console.log('res', res);
		// 		const session = res.data;
		// 		dispatch('USER_TRANSITION', {type: 'SUCCESS', params: {session, rememberMe: true}});
		// 	})
		// 	.catch((err) => {
		// 		dispatch('USER_TRANSITION', {type: 'FAILURE'});
		// 		console.log('err', err);
		// 	});
	}
};

const mutations = {
	updateUserState (state, nextState) {
		state.state = nextState;
	},
	storeUser (state, user) {
		state.user = user;
	},
	updateLocalUserAttribute (state, {attribute, newValue}) {
		state.user[attribute] = newValue;
	}
};

export default {
	state,
	mutations,
	actions
};
