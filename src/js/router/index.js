import Vue from 'vue';
import Router from 'vue-router';
import ItemView from '@/js/views/item-view';
import LoginView from '@/js/views/login-view';
import InitialView from '@/js/views/initial-view';
// import ArtistView from '@/js/views/artist-view';

Vue.use(Router);

// const ArtistView = () => import('./');

export default new Router({
	mode: 'history',
	fallback: false,
	scrollBehavior: () => ({y: 0}),
	routes: [
		{
			path: '/',
			component: InitialView,
			props: true
		},
		{
			path: '/login/',
			component: LoginView,
			props: true
		},
		{
			path: '/login/:registration',
			component: LoginView,
			props: true
		},
		{
			path: '/current',
			component: ItemView,
			props: true
		},
		{
			path: '/completed',
			component: ItemView,
			props: true
		},
		{
			path: '/discogs',
			component: ItemView,
			props: true
		},
		{
			path: '/related-artists',
			component: ItemView,
			props: true
		},
		{
			path: '/artist-releases/:artist',
			component: ItemView,
			name: 'artist-releases',
			props: true
		}
	]
});
