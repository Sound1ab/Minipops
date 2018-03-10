export const USER = {
	addUser: `https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/add-user`
};

export const WANTLIST = {
	accessData: `https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/access-data`,
	wantlist: `https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/wantlist`,
	releases: `https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/release`,
	addToWantlist: `https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/add-to-wantlist`,
	deleteFromWantlist: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/delete-from-wantlist'
};

export const ITEMS = {
	current: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/current-items',
	completed: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/completed-items',
	discogs: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/discogs-items',
	discovery: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/related-artists',
	'artist-releases': 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/artist'
};

export const SUBSCRIBE = {
	saveSubscription: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/save-subscription',
	removeSubscription: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/remove-subscription',
	WATCH: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/watch-item',
	REMOVE_WATCH: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/remove-watch',
	RETRIEVE_WATCHERS: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/retrieve-watchers'
};

export const COGNITO = {
	LOGIN: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/authenticate-user',
	REGISTER_USER: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/sign-up',
	VERIFY_USER: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/confirm-registration',
	RESET: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/forgot-password-reset',
	VERIFY_RESET: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/forgot-password-verify',
	UPDATE_USER_ATTRIBUTE: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/update-user-attribute',
	TOKEN_EXPIRED: 'https://10ru70869i.execute-api.us-east-2.amazonaws.com/production/refresh-token'
};

// https://w4jl7ji5wj.execute-api.us-east-1.amazonaws.com/prod
