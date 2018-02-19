import {Machine} from 'xstate';

const id = 'Fetch';

const conditionalCheck = function conditionalCheck ({query = '', routeEnteringQuery = ''}) {
	return (query && query.length > 0 && query !== routeEnteringQuery);
};

export const fetchMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				FETCH_DATA_REQUEST: {
					creatingCancelToken: {
						cond: conditionalCheck
					}
				}
			}
		},
		creatingCancelToken: {
			onEntry: ['CREATE_CANCEL_TOKEN'],
			on: {
				TOKEN_CREATED: 'fetchingData'
			}
		},
		fetchingData: {
			onEntry: ['SHOW_LOADING', `FETCH_DATA`],
			on: {
				SUCCESS: {
					idle: {
						actions: ['TOGGLE_MENU']
					}
				},
				FAILURE: {
					idle: {
						actions: ['SHOW_CONFIRMATION']
					}
				}
			},
			onExit: ['HIDE_LOADING']
		}
	}
});
