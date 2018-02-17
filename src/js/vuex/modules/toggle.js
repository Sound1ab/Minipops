import {toggleMachine} from '@/assets/FSM/toggleMachine';
import {transition} from '@/js/vuex/fsm-transition';
import router from '@/js/router/index';
import Store from '@/js/vuex/index';

router.onReady((route) => {
	Store.dispatch('TOGGLE_TRANSITION', {type: 'CLICK', params: {path: route.params.id, router}});
});

const state = {
	state: toggleMachine.initial
};

const actions = {
	TOGGLE_TRANSITION: transition.bind(null, toggleMachine),
	UPDATE_ROUTER ({dispatch}, {params: {path, router}}) {
		router.push({name: `items`, params: {id: path}});
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
