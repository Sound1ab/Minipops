import {removeHttp} from '@/js/filters/remove-http';

export function refineWantlist (data) {
	return data.map(element => {
		return {
			title: `${element.basic_information.artists[0].name} ${element.basic_information.title}`,
			id: element.basic_information.id,
			imageUrl: element.basic_information.thumb
		};
	});
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
	return data.map(element => {
		return {
			title: element.title[0],
			imageUrl: removeHttp(element.galleryURL[0]),
			itemUrl: element.viewItemURL[0],
			price: parseFloat(element.sellingStatus[0].currentPrice[0].__value__).toFixed(2),
			endTime: timeRemain(element.listingInfo[0].endTime[0]),
			endTimeUnmodified: element.listingInfo[0].endTime[0],
			bids: element.sellingStatus[0].bidCount[0],
			postage: parseFloat(element.shippingInfo[0].shippingServiceCost[0].__value__).toFixed(2),
			location: element.location[0],
			country: element.country[0],
			itemId: element.itemId[0]
		};
	});
}

const removeCurrency = val => val.replace('£', '');

export function refineDiscogs (data) {
	return data.listing.map(element => {
		return {
			title: element.title,
			imageUrl: element.imageUrl,
			price: removeCurrency(element.price),
			itemUrl: element.itemUrl
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
	return artists.success.map(el => {
		return {
			title: el.name,
			imageUrl: el.images[0].url,
			genres: el.genres,
			itemUrl: el.external_urls.spotify,
			spotifyId: el.id
		};
	});
}

export const normalizer = {
	current: refineEbaylist,
	completed: refineEbaylist,
	discogs: refineDiscogs,
	'related-artists': refineRelatedArtists
};
