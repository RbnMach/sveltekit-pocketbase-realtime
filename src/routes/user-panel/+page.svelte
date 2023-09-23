<script lang="ts">
	import ListaItems from './ListaItems.svelte';
	import { goto } from '$app/navigation';

	export let data;

	async function logout() {
		const res = await fetch(`api/logout`, {
			method: 'GET'
		});
		if (res.ok) {
			goto('/login');
		}
	}
</script>

<h1>USER PANEL</h1>

<button on:click={logout}>LOGOUT</button>

<p>User who logged in : <b>{data.user?.email}</b></p>
<!-- <pre>{JSON.stringify(data.user, null, 2)}</pre> -->

<hr />
<!-- ITEM LIST TO DEPLOY POCKETBASE REALTIME-->
<ListaItems items={data.items} />

<style>
	b {
		font-size: large;
	}
</style>
