import axios from 'axios';
import {artistMachine} from '@/js/vuex/FSM/artistMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {ITEMS} from '@/js/vuex/api';

const state = {
	state: artistMachine.initial,
	artistInfo: {}
};

const actions = {
	ARTIST_TRANSITION: transition.bind(null, artistMachine),
	FETCH_ARTIST_DATA ({commit, dispatch, rootState}, {params: {query}}) {
		const user = rootState.user.user.idToken;
		if (!query || !user) {
			dispatch('ARTIST_TRANSITION', {type: 'FAILURE'});
		}
		axios.get(ITEMS['artist'], {params: {user, artist: query}})
			.then(res => {
				commit('updateArtistInfo', res.data);
				dispatch('ARTIST_TRANSITION', {type: 'SUCCESS'});
			})
			.catch(() => {
				dispatch('ARTIST_TRANSITION', {type: 'FAILURE'});
			});
	}
};

const mutations = {
	updateArtistState (state, nextState) {
		state.state = nextState;
	},
	updateArtistInfo (state, artistInfo) {
		state.artistInfo = artistInfo;
	}
};

export default {
	state,
	mutations,
	actions
};
