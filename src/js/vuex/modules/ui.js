const state = {
	menu: false,
	dropdown: false,
	sort: false,
	search: false,
	profile: false,
	loading: false,
	tab: 'current',
	authenticationMessage: false,
	confirmation: {
		state: false,
		value: '',
		message: ''
	}
};

const actions = {
	TOGGLE_MENU ({commit}, payload) {
		if (typeof payload !== 'boolean') {
			payload = false;
		}
		commit('toggleMenu', payload);
	},
	TOGGLE_DROPDOWN ({commit}, payload) {
		commit('toggleDropdown', payload);
	},
	TOGGLE_SORT ({commit}, payload) {
		commit('toggleSort', payload);
	},
	TOGGLE_SEARCH ({commit}, payload) {
		commit('toggleSearch', payload);
	},
	TOGGLE_PROFILE ({commit}, payload) {
		commit('toggleProfile', payload);
	},
	SHOW_LOADING ({commit}) {
		commit('loading', true);
	},
	HIDE_LOADING ({commit}) {
		commit('loading', false);
	},
	SHOW_AUTHENTICATION_MESSAGE ({commit}) {
		commit('authenticationMessage', true);
	},
	HIDE_AUTHENTICATION_MESSAGE ({commit}) {
		commit('authenticationMessage', false);
	},
	SHOW_CONFIRMATION ({commit}, {type, params: {message = ''} = {}}) {
		commit('showConfirmation', {state: true, value: type === 'SUCCESS', message});
		setTimeout(() => {
			commit('showConfirmation', {state: false, value: '', message: ''});
		}, 1000);
	}
};

const mutations = {
	toggleMenu (state, payload) {
		state.menu = payload;
	},
	toggleDropdown (state, payload) {
		state.dropdown = payload;
	},
	toggleSort (state, payload) {
		state.sort = payload;
	},
	toggleProfile (state, payload) {
		state.profile = payload;
	},
	toggleSearch (state, payload) {
		state.search = payload;
	},
	loading (state, payload) {
		state.loading = payload;
	},
	authenticationMessage (state, payload) {
		state.authenticationMessage = payload;
	},
	showConfirmation (state, payload) {
		state.confirmation = payload;
	}
};

export default {
	state,
	mutations,
	actions
};
