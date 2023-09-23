import { redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	// simulating database item list load time (3s)
	await new Promise((resolve) => setTimeout(resolve, 3000));

	const items = await locals.pb.collection('items').getFullList({
		sort: '-created'
	});

	if (!locals.pb.authStore.isValid) {
		throw redirect(307, `/`);
	}
	return {
		user: locals.user,
		items: structuredClone(items)
	};
};

export const actions = {
	addEditItem: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const data = {
			name: formData.get('name'),
			quantity: formData.get('quantity')
		};

		if (id == '') {
			// new item
			try {
				await locals.pb.collection('items').create(data);
			} catch (error) {
				if (error instanceof ClientResponseError) {
					console.error(error.response);
				}
			}
		} else {
			// edit item
			try {
				await locals.pb.collection('items').update(`${id}`, data);
			} catch (error) {
				if (error instanceof ClientResponseError) {
					console.error(error.response);
				}
			}
		}
	},
	deleteItem: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		try {
			await locals.pb.collection('items').delete(`${id}`);
		} catch (error) {
			if (error instanceof ClientResponseError) {
				console.error(error.response);
			}
		}
	}
};
