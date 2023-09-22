import PocketBase from 'pocketbase';
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		// if (event.locals.pb.authStore.isValid) {
		// event.locals.user = structuredClone(await event.locals.pb.collection('cuenta').authRefresh());
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
		// } else {
		// 	event.locals.user = undefined;
		// }
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);
	const isProd = process.env.NODE_ENV === 'production' ? true : false;
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax', httpOnly: false })
	);
	return response;
};
