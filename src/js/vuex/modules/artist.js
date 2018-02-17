import axios from 'axios';
import {artistMachine} from '@/assets/FSM/artistMachine';
import {transition} from '@/js/vuex/fsm-transition';
import {ITEMS} from '@/js/vuex/api';

const state = {
	state: artistMachine.initial,
	artistInfo: {}
};

const actions = {
	ARTIST_TRANSITION: transition.bind(null, artistMachine),
	FETCH_ARTIST_DATA ({commit, dispatch, rootState}, {params: {artist}, callback}) {
		const user = rootState.user.user;
		if (!artist || !user) {
			dispatch('ARTIST_TRANSITION', {type: 'FAILURE'});
		}
		axios.get(ITEMS['artist'], {params: {user, artist}})
			.then(res => {
				console.log(res);
				commit('updateArtistInfo', res.data);
				dispatch('ARTIST_TRANSITION', {type: 'SUCCESS'});
				callback();
			})
			.catch(err => {
				console.log(err);
				dispatch('ARTIST_TRANSITION', {type: 'FAILURE'});
				callback();
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
