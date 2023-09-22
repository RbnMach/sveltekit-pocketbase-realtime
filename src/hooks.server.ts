import { Pb } from '$lib/conexion-database/conexion_pocket';
export const handle = async ({ event, resolve }) => {
	event.locals.pb = Pb(); 
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		if (event.locals.pb.authStore.isValid) {
			event.locals.user = structuredClone(await event.locals.pb.collection('cuenta').authRefresh());
		} else {
			event.locals.user = undefined;
		}
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