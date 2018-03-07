import {Machine} from 'xstate';

const id = 'Search';

export const searchMachine = Machine({
	id,
	initial: 'searching',
	strict: true,
	states: {
		searching: {
			initial: 'searchReady',
			states: {
				searchReady: {
					on: {
						TEXT_INPUT: 'typing'
					}
				},
				typing: {
					onEntry: ['START_TIMER', 'UPDATE_SEARCH', 'CANCEL_OUTGOING_REQUEST'],
					on: {
						TEXT_INPUT_EMPTY: 'searchReady',
						TEXT_INPUT: 'typing'
					}
				}
			},
			on: {
				TIMER_COUNTDOWN_PASSED: 'dispatchingSearch',
				UPDATE_SEARCH: {
					searching: {
						actions: ['UPDATE_SEARCH']
					}
				}
			}
		},
		dispatchingSearch: {
			onEntry: ['DISPATCHING_SEARCH'],
			on: {
				SEARCH_DISPATCHED: 'searching'
			}
		}
	}
});
