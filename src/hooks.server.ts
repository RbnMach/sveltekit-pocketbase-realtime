import PocketBase from 'pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('cuenta').authRefresh());
		event.locals.user = {
			record: event.locals.pb.authStore?.model,
			token: event.locals.pb.authStore?.token
		};
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}
// export const handle = async ({ event, resolve }) => {
// 	event.locals.pb = new PocketBase('http://127.0.0.1:8090');
// 	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
// 	try {
// 		// if (event.locals.pb.authStore.isValid) {
// 		// event.locals.user = structuredClone(await event.locals.pb.collection('cuenta').authRefresh());
// 		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
// 		// } else {
// 		// 	event.locals.user = undefined;
// 		// }
// 	} catch (_) {
// 		event.locals.pb.authStore.clear();
// 	}

// 	const response = await resolve(event);
// 	const isProd = process.env.NODE_ENV === 'production' ? true : false;
// 	response.headers.append(
// 		'set-cookie',
// 		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax', httpOnly: false })
// 	);
// 	return response;
// };
