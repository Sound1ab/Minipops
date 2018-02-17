function createParams (data) {
	return data.map(el => {
		let body = el.message ? el.message : '';
		let requireInteraction = el.requireInteraction !== undefined ? el.requireInteraction : false;
		return {
			body,
			icon: '/static/notification_icon.png',
			badge: '/static/notification_badge.png',
			requireInteraction: false,
			data: el.itemUrl ? el.itemUrl : null
		};
	});
}

function showNotification (title, params) {
	return self.registration.showNotification(title, params);
}

self.addEventListener('push', function (event) {
	let payload = event.data.text();
	let data;
	let params;
	let count = 0;
	if (payload && typeof payload === 'string') {
		data = JSON.parse(event.data.text());
	}
	if (data) {
		params = createParams(data);
	}
	const title = 'Collector';
	event.waitUntil(
	params.forEach(el => {
		setTimeout(() => {
			self.registration.showNotification(title, el);
		}, 2000 * count++);
	})
	);
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	const url = event.notification.data ? event.notification.data : null;
	if (url) {
		event.waitUntil(
			clients.openWindow(url)
		);
	}
});
