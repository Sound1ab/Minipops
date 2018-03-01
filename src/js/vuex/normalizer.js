import {removeHttp} from '@/js/filters/remove-http';
const lodashGet = require('lodash/get');

export function refineWantlist (data) {
	return data.reduce((acc, element) => {
		if (element.basic_information.artists.length > 0) {
			acc.push({
				title: `${element.basic_information.artists[0].name} ${element.basic_information.title}`,
				id: element.basic_information.id,
				imageUrl: element.basic_information.thumb
			});
		}
		return acc;
	}, []);
}

export function refineReleases (data) {
	return data.map(element => {
		element = element.data;
		return {
			title: `${element.artists[0].name} ${element.title}`,
			id: element.id,
			imageUrl: element.thumb,
			extraInfo: {
				genres: element.genres,
				styles: element.styles,
				lowestPrice: element.lowest_price,
				notes: element.notes,
				release: element.release_formatted,
				tracklist: element.tracklist,
				year: element.year
			}
		};
	});
}

export function extractReleaseId (wantlist) {
	return wantlist.map(el => {
		return el.id;
	});
}

export function refineEbaylist (data) {
	let refined = data.map(el => {
		const title = lodashGet(el, 'title[0]') || '';
		const imageUrl = lodashGet(el, 'galleryURL[0]') || '';
		const itemUrl = lodashGet(el, 'viewItemURL[0]') || '';
		const price = lodashGet(el, 'sellingStatus[0].currentPrice[0].__value__') || 0;
		const endTime = lodashGet(el, 'listingInfo[0].endTime[0]') || '';
		const endTimeUnmodified = lodashGet(el, 'listingInfo[0].endTime[0]') || '';
		const bids = lodashGet(el, 'sellingStatus[0].bidCount[0]') || '';
		const postage = lodashGet(el, 'shippingInfo[0].shippingServiceCost[0].__value__') || 0;
		return {
			title,
			imageUrl: removeHttp(imageUrl),
			itemUrl,
			price: parseFloat(price).toFixed(2),
			endTime: timeRemain(endTime),
			endTimeUnmodified,
			bids,
			postage: parseFloat(postage).toFixed(2)
		};
	});
	return refined;
}

const removeCurrency = val => val.replace('£', '');

export function refineDiscogs (data) {
	return data.listing.map(el => {
		return {
			title: lodashGet(el, 'title'),
			imageUrl: lodashGet(el, 'imageUrl'),
			price: lodashGet(el, 'price') ? removeCurrency(lodashGet(el, 'price')) : '',
			itemUrl: lodashGet(el, 'itemUrl')
		};
	});
}

export function timeRemain (endPoint) {
	const countDownDate = new Date(`${endPoint}`).getTime();
	const now = new Date().getTime();
	const distance = countDownDate - now;
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);
	return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function refineRelatedArtists (artists) {
	return artists.map(el => {
		return {
			title: lodashGet(el, 'name'),
			imageUrl: lodashGet(el, 'images[0].url'),
			genres: lodashGet(el, 'genres'),
			itemUrl: lodashGet(el, 'external_urls.spotify'),
			spotifyId: lodashGet(el, 'id'),
			primary: lodashGet(el, 'primary')
		};
	});
}

function refineArtistReleases (artists) {
	return artists.map(el => {
		return {
			title: lodashGet(el, 'artists[0].name'),
			secondaryTitle: lodashGet(el, 'name'),
			imageUrl: lodashGet(el, 'images[0].url'),
			releaseDate: lodashGet(el, 'release_date'),
			spotifyId: lodashGet(el, 'id')
		};
	});
}

export const normalizer = {
	current: refineEbaylist,
	completed: refineEbaylist,
	discogs: refineDiscogs,
	discovery: refineRelatedArtists,
	'artist-releases': refineArtistReleases
};
