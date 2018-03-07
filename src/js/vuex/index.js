import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
	modules,
	actions: {
		CLEAR_ALL ({commit}) {
			commit('resetStateData');
		}
	},
	strict: process.env.NODE_ENV !== 'production'
});
