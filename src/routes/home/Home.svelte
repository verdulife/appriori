<script>
	import List from './List.svelte';
	import { lists } from '../../stores.js';

	let newHide = true;
	let lists_values;
	let plainList;
	let can_discard = false;

	const unsubscribe = lists.subscribe((value) => {
		lists_values = value;
	});

	function togNew() {
		newHide = !newHide;
		setTimeout(() => {
			if (!newHide) document.querySelector('textarea').focus();
		});
	}

	function makeList() {
		let arr = plainList.split('\n');

		arr = arr.map((el) => {
			return {
				title: el,
			};
		});

		let list = {
			items: arr,
			can_discard: can_discard,
			created: Date.now(),
		};

		lists.update((n) => [...n, list]);
		plainList = '';
		togNew();
	}
</script>

<style lang="scss">
	@import '../../assets/vars';
	@import './Home';
	@import './Home.m';
</style>

<div class="scroll">
	<div class="home col w100 p40 fcenter">
		<h1>Appriory</h1>

		{#if newHide}
			<button class="pri semi" on:click={togNew}>NUEVA LISTA</button>
		{:else}
			<textarea class="out semi p20" bind:value={plainList} />
			<button class="pri semi" on:click={makeList}>ENLISTAR</button>

			<div class="row w100 fcenter m20">
				<input type="checkbox" id="can_discard" bind:checked={can_discard} />
				<label for="can_discard">Se pueden descartar items</label>
			</div>
		{/if}

		{#if lists_values.length}
			<h2>Listas</h2>

			<div class="row w100 jcenter">
				{#each lists_values as list}
					<List items={list.items} created={list.created} discard={list.can_discard} />
				{/each}
			</div>
		{/if}
	</div>
</div>
