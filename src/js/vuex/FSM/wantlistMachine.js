import {Machine} from 'xstate';
import {getFromLocalStorage} from '@/js/helpers/localStorage';

const id = 'Wantlist';

export const wantlistMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				LOADED: {
					checkingAuthentication: {
						cond: () => {
							return !getFromLocalStorage('vcollect_doesNotWantToAuthenticate');
						}
					},
					unauthenticated: {
						cond: () => {
							return getFromLocalStorage('vcollect_doesNotWantToAuthenticate');
						}
					}
				}
			}
		},
		checkingAuthentication: {
			onEntry: ['CHECK_AUTHENTICATION'],
			on: {
				SUCCESS: 'fetchingData',
				FAILURE: 'showingAuthenticationMessage'
			}
		},
		showingAuthenticationMessage: {
			onEntry: ['SHOW_AUTHENTICATION_MESSAGE'],
			on: {
				AUTHENTICATE: 'redirecting',
				DONT_AUTHENTICATE: 'unauthenticated'
			},
			onExit: ['HIDE_AUTHENTICATION_MESSAGE', 'SAVE_AUTHENTICATION_PREFERENCE']
		},
		unauthenticated: {
			on: {
				REAUTHENTICATE: 'showingAuthenticationMessage'
			}
		},
		redirecting: {
			onEntry: ['REDIRECT']
		},
		fetchingData: {
			onEntry: ['SHOW_LOADING', `FETCH_WANTLIST_DATA`],
			on: {
				SUCCESS: 'fulfilled',
				FAILURE: 'rejected'
			},
			onExit: 'HIDE_LOADING'
		},
		addingToWantlist: {
			onEntry: ['SHOW_LOADING', 'UPDATE_WANTLIST_DATA'],
			on: {
				SUCCESS: 'fetchingData',
				FAILURE: 'rejected'
			},
			onExit: ['HIDE_LOADING', 'SHOW_CONFIRMATION']
		},
		removingFromWantlist: {
			onEntry: ['SHOW_LOADING', 'UPDATE_WANTLIST_DATA'],
			on: {
				SUCCESS: {
					fulfilled: {
						actions: ['REMOVE_ITEM_FROM_WANTLIST']
					}
				},
				FAILURE: 'rejected'
			},
			onExit: ['HIDE_LOADING', 'SHOW_CONFIRMATION']
		},
		fulfilled: {
			on: {
				REQUEST: 'fetchingData',
				ADD_TO_WANTLIST: 'addingToWantlist',
				REMOVE_FROM_WANTLIST: 'removingFromWantlist'
			}
		},
		rejected: {
			on: {
				REQUEST: 'fetchingData',
				ADD_TO_WANTLIST: 'addingToWantlist',
				REMOVE_FROM_WANTLIST: 'removingFromWantlist'
			}
		}
	}
});
