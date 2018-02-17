import {Machine} from 'xstate';

const id = 'Search';

const conditionalCheck = function conditionalCheck (extState, {params: {query, routeEnteringQuery}, callback}) {
	if (query === routeEnteringQuery && callback) {
		callback();
	}
	return (query && query.length > 0 && query !== routeEnteringQuery);
};

export const searchMachine = Machine({
	id,
	initial: 'closed',
	strict: true,
	states: {
		closed: {
			on: {
				SEARCH_SELECTED: 'searching',
				TAB_UPDATED: {
					fetchingData: {
						cond: conditionalCheck
					}
				}
			}
		},
		searching: {
			initial: 'searchReady',
			states: {
				searchReady: {
					on: {
						TEXT_INPUT: 'typing'
					}
				},
				typing: {
					onEntry: ['START_TIMER', 'CANCEL_OUTGOING_REQUEST'],
					on: {
						TEXT_INPUT_EMPTY: 'searchReady',
						TEXT_INPUT: 'typing'
					}
				}
			},
			on: {
				CLOSE: 'closed',
				TIMER_COUNTDOWN_PASSED: 'fetchingData',
				TAB_UPDATED: {
					fetchingData: {
						cond: conditionalCheck
					}
				}
			}
		},
		fetchingData: {
			initial: 'request',
			states: {
				request: {
					onEntry: ['SHOW_LOADING', `FETCH_DATA`],
					on: {
						SUCCESS: 'fulfilled',
						FAILURE: 'rejected'
					},
					onExit: 'HIDE_LOADING'
				},
				fulfilled: {
					onEntry: ['TOGGLE_MENU']
				},
				rejected: {
					onEntry: ['SHOW_CONFIRMATION']
				}
			},
			on: {
				TEXT_INPUT: 'searching.typing',
				SEARCH_SELECTED: 'searching',
				TAB_UPDATED: {
					fetchingData: {
						cond: conditionalCheck
					}
				},
				CLOSE: {
					closed: {
						cond: (extState, eventObj) => {
							return eventObj.params.fetchingData !== 'request';
						}
					}
				}
			},
			onExit: ['CANCEL_OUTGOING_REQUEST']
		}
	}
});
