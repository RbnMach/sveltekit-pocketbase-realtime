import { redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(307, `/user-panel`);
	}
};

export const actions = {
	login: async ({ locals, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;		

		try {
			const resLogin = await locals.pb.collection('cuenta').authWithPassword(email, password);

			if (!resLogin.record.verified) {
				locals.pb.authStore.clear();
				throw redirect(303, '/');
			}
		} catch (error) {
			if (error instanceof ClientResponseError) {
				console.error(error.response);
			}
			throw redirect(303, '/');
		}
	}
};
