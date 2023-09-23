import PocketBase from 'pocketbase';

let pocket: PocketBase;
export const Pb = () => {
	if (!pocket) {
		pocket = new PocketBase('http://127.0.0.1:8090');
	}
	return pocket;
};
