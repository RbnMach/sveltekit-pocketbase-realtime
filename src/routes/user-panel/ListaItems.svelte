<script lang="ts">
	import PocketBase from 'pocketbase';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	export let items: PageData['items'];

	let btnTxt = 'New Item';
	let item = {
		id: '',
		name: '',
		quantity: ''
	};

	// REALTIME POCKETBASE
	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

	onMount(async () => {
		pb.authStore.loadFromCookie(document.cookie);
		pb.collection('items').subscribe('*', function (e: any) {
			// console.log(e.action);
			// console.log(e.record);
			invalidateAll();
		});
	});
	onDestroy(() => {
		pb.collection('items').unsubscribe('*');
	});
</script>

<h3>ITEMS REALTIME (IN PROGRESS)</h3>
<form action="?/addEditItem" method="POST" use:enhance>
	<input type="hidden" name="id" bind:value={item.id} />
	<input type="text" name="name" placeholder="Name item" bind:value={item.name} />
	<input type="text" name="quantity" placeholder="Quantity" bind:value={item.quantity} />
	<button type="submit">{btnTxt}</button>
	<button
		type="button"
		on:click={() => {
			btnTxt = 'New Item';
			item = {
				id: '',
				name: '',
				quantity: ''
			};
		}}
		hidden={item.id == ''}>Cancel</button
	>
</form>
<p style="margin-top: 35px;">List loads after 3 seconds</p>
<table>
	<tr>
		<th>Name</th>
		<th>Quantity</th>
		<th>Actions</th>
	</tr>
	{#each items as row}
		<tr>
			<td>{row.name}</td>
			<td>{row.quantity}</td>
			<td>
				<button
					type="button"
					on:click={() => {
						item = {
							id: row.id,
							name: row.name,
							quantity: row.quantity
						};
						btnTxt = 'Edit Item';
					}}>Edit</button
				>
				<form action="?/deleteItem" method="POST" use:enhance>
					<input type="hidden" name="id" bind:value={row.id} />
					<button type="submit">Delete</button>
				</form>
			</td>
		</tr>
	{:else}
		<small>No items</small>
	{/each}
</table>

<style>
	td {
		padding-top: 10px;
	}
</style>
