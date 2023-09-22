import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	const textBtn = !locals.pb.authStore.isValid ? 'LOGIN' : 'MENU';
    return { textBtn };
};
