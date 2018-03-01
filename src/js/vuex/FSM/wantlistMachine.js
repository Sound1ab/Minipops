import {Machine} from 'xstate';

const id = 'Wantlist';

export const wantlistMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				FETCH_WANTLIST: 'fetchingWantlist',
				ADD_TO_WANTLIST: 'addingToWantlist',
				DELETE_FROM_WANTLIST: 'deletingFromWantlist'
			}
		},
		fetchingWantlist: {
			onEntry: ['SHOW_LOADING', `FETCH_WANTLIST_DATA`],
			on: {
				SUCCESS: 'idle',
				FAILURE: 'idle'
			},
			onExit: 'HIDE_LOADING'
		},
		addingToWantlist: {
			onEntry: ['SHOW_LOADING', 'UPDATE_WANTLIST_DATA'],
			on: {
				SUCCESS: {
					idle: {
						actions: ['ADD_ITEM_TO_WANTLIST']
					}
				},
				FAILURE: 'idle'
			},
			onExit: ['HIDE_LOADING', 'SHOW_CONFIRMATION']
		},
		deletingFromWantlist: {
			onEntry: ['SHOW_LOADING', 'UPDATE_WANTLIST_DATA'],
			on: {
				SUCCESS: {
					idle: {
						actions: ['REMOVE_ITEM_FROM_WANTLIST']
					}
				},
				FAILURE: 'idle'
			},
			onExit: ['HIDE_LOADING', 'SHOW_CONFIRMATION']
		}
	}
});
