const state = {
	state: ''
};

const actions = {
	UPDATE_TOGGLE_STATE ({commit}, payload) {
		commit('updateToggleState', payload);
	}
};

const mutations = {
	updateToggleState (state, nextState) {
		state.state = nextState;
	}
};

export default {
	state,
	mutations,
	actions
};
