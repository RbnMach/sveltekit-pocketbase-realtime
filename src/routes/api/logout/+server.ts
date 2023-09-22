import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	await locals.pb.authStore.clear();
	return json({ logout: true });
};
