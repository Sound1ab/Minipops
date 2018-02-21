import {Machine} from 'xstate';

const id = 'Search';

export const searchMachine = Machine({
	id,
	initial: 'closed',
	strict: true,
	states: {
		closed: {
			on: {
				SEARCH_SELECTED: 'searching',
				UPDATE_SEARCH: {
					closed: {
						actions: ['UPDATE_SEARCH']
					}
				},
				TEXT_INPUT: 'searching.typing'
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
				TIMER_COUNTDOWN_PASSED: {
					searching: {
						actions: ['DISPATCHING_SEARCH']
					}
				},
				UPDATE_SEARCH: {
					searching: {
						actions: ['UPDATE_SEARCH']
					}
				}
			}
		}
	}
});
