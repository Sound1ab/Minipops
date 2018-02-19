import {Machine} from 'xstate';

const id = 'Artist';

export const artistMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				LOADED: {
					fetchingArtistData: {
						actions: ['UPDATE_SEARCH']
					}
				}
			}
		},
		fetchingArtistData: {
			onEntry: ['SHOW_LOADING', 'FETCH_ARTIST_DATA'],
			on: {
				SUCCESS: 'idle',
				FAILURE: 'idle'
			},
			onExit: ['HIDE_LOADING']
		}
	}
});
