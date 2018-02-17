const state = {
	menu: false,
	dropdown: false,
	sort: false,
	loading: false,
	tab: 'current',
	authenticationMessage: false
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
	loading (state, payload) {
		state.loading = payload;
	},
	authenticationMessage (state, payload) {
		state.authenticationMessage = payload;
	}
};

export default {
	state,
	mutations,
	actions
};
