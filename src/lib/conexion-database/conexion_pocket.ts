import PocketBase from 'pocketbase';

let pocket: PocketBase;

let url = 'http://127.0.0.1:8090';
export const Pb = () => {
	if (!pocket) {
		pocket = new PocketBase('http://127.0.0.1:8090');
	}
	return pocket;
};
