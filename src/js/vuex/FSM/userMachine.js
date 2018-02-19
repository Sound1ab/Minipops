import {Machine} from 'xstate';

const id = 'User';

export const userMachine = Machine({
	id,
	initial: 'idle',
	strict: true,
	states: {
		idle: {
			on: {
				LOADED: 'checkingForUser'
			}
		},
		checkingForUser: {
			onEntry: ['CHECKING_FOR_USER'],
			on: {
				SUCCESS: 'storingUser',
				FAILURE: 'creatingUser'
			}
		},
		storingUser: {
			onEntry: ['STORE_USER'],
			on: {
				USER_STORED: 'idle'
			}
		},
		creatingUser: {
			onEntry: ['CREATE_USER'],
			on: {
				SUCCESS: 'checkingForUser',
				FAILURE: 'idle'
			}
		}
	}
});
