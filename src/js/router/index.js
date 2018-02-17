import Vue from 'vue';
import Router from 'vue-router';
import ItemView from '@/js/views/item-view';
import ArtistView from '@/js/views/artist-view';

Vue.use(Router);

// const ArtistView = () => import('./');

export default new Router({
	mode: 'history',
	fallback: false,
	scrollBehavior: () => ({y: 0}),
	routes: [
		{path: '/', redirect: '/current'},
		{
			path: '/:id',
			name: 'items',
			component: ItemView,
			props: true
		},
		{
			path: '/related-artists/:artist',
			name: 'artist',
			component: ArtistView,
			props: true
		}
	]
});
