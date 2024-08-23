import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('cuenta').authRefresh());
		event.locals.user = event.locals.pb.authStore?.model;
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production';
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax', httpOnly: false })
	);

	return response;
}
