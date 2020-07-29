import { writable } from 'svelte/store';

export const lists = writable([
	{
		can_discard: true,
		created: 1596043748418,
		items: [{ title: 'caca' }, { title: 'coca' }, { title: 'cosa' }, { title: 'casa' }],
	},
]);
