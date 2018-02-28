import {Machine} from 'xstate';

const id = 'Watch';

export const watchMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				WATCH: 'addWatcher',
				REMOVE_WATCH: 'removeWatcher',
				RETRIEVE_WATCHERS: 'retrievingWatchers'
			}
		},
		addWatcher: {
			onEntry: [`SEND_SPOTIFY_ID`, 'SHOW_LOADING'],
			on: {
				SUCCESS: {
					idle: {
						actions: ['ADD_ITEM_TO_WATCHERS']
					}
				},
				FAILURE: 'idle'
			},
			onExit: ['HIDE_LOADING', 'SHOW_CONFIRMATION']
		},
		removeWatcher: {
			onEntry: [`SEND_SPOTIFY_ID`, 'SHOW_LOADING'],
			on: {
				SUCCESS: {
					idle: {
						actions: ['REMOVE_ITEM_FROM_WATCHERS']
					}
				},
				FAILURE: 'idle'
			},
			onExit: ['HIDE_LOADING', 'SHOW_CONFIRMATION']
		},
		retrievingWatchers: {
			onEntry: ['RETRIEVE_WATCHERS'],
			on: {
				SUCCESS: 'idle',
				FAILURE: 'idle'
			}
		}
	}
});
