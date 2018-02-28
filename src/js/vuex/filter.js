const orderBy = require('lodash/orderBy');

export const filterKeys = {
	priceLowHigh: 'Lowest Price',
	priceHighLow: 'Highest Price',
	endSoon: 'Ending Soonest'
};

export const filter = {
	[filterKeys.priceLowHigh]: (data) => orderBy(data, (item) => parseInt(item.price, 10), ['asc']),
	[filterKeys.priceHighLow]: (data) => orderBy(data, (item) => parseInt(item.price, 10), ['desc']),
	[filterKeys.endSoon]: (data) => orderBy(data, (item) => new Date(item.endTimeUnmodified).getTime(), ['asc']),
	'End Late': (data) => orderBy(data, (item) => new Date(item.endTimeUnmodified).getTime(), ['desc'])
};

export const filterAlphabetically = (data) => orderBy(data, (item) => `${item.artist} ${item.album}`, ['asc']);
