// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import globalStyles from '@styles/global.scss';
import * as svgicon from 'vue-svgicon';
import designMode from './directives/designMode';
import pullToRefresh from './directives/pull-to-refresh.js';
import swipeToDelete from './directives/swipe-to-delete.js';
import infiniteScroll from './directives/infinite-scroll.js';
import progressiveImage from './directives/progressive-image.js';
import {requireImage} from './mixins/require-image.js';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// Polyfills
import '@/js/helpers/closest-polyfill';
import 'vue-svgicon/dist/polyfill';
require('intersection-observer');

Vue.directive('design-mode', designMode());
Vue.directive('pull-to-refresh', pullToRefresh());
Vue.directive('swipe-to-delete', swipeToDelete());
Vue.directive('infinite-scroll', infiniteScroll());
Vue.directive('progressive-image', progressiveImage());

Vue.mixin(requireImage);

Vue.use(svgicon);
Vue.use(VueAwesomeSwiper, /* { default global options } */);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
