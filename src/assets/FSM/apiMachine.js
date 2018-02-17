export function apiMachine (api) {
	return {
		fetching: {
			onEntry: ['SHOW_LOADING', `FETCH_${api}_DATA`],
			on: {
				SUCCESS: 'fulfilled',
				FAILURE: 'rejected'
			},
			onExit: 'HIDE_LOADING'
		},
		fulfilled: {
			on: {
				REQUEST: 'fetchingData'
			}
		},
		rejected: {
			on: {
				REQUEST: 'fetchingData'
			}
		}
	};
}
