import {Machine} from 'xstate';

const id = 'Toggle';

export const toggleMachine = Machine({
	id,
	initial: 'buttonSelected',
	states: {
		buttonSelected: {
			initial: 'current',
			states: {
				current: {},
				completed: {},
				discogs: {},
				discovery: {}
			},
			on: {
				CLICK: {
					'buttonSelected.current': {
						cond: (extState, extObj) => {
							return extObj.params.path === 'current';
						}
					},
					'buttonSelected.completed': {
						cond: (extState, extObj) => {
							return extObj.params.path === 'completed';
						}
					},
					'buttonSelected.discogs': {
						cond: (extState, extObj) => {
							return extObj.params.path === 'discogs';
						}
					},
					'buttonSelected.related-artists': {
						cond: (extState, extObj) => {
							return extObj.params.path === 'discovery';
						}
					}
				}
			},
			onEntry: ['UPDATE_ROUTER']
		}
	}
});
