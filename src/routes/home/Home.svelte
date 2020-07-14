<script>
  import List from "./List.svelte";
  import { lists } from "../../stores.js";

  let newHide = true;
  let lists_values;
  let plainList;

  const unsubscribe = lists.subscribe((value) => {
    lists_values = value;
  });

  function togNew() {
    newHide = !newHide;
    setTimeout(() => {
      if (!newHide) document.querySelector("textarea").focus();
    });
  }

  function makeList() {
    let arr = plainList.split("\n");

    arr = arr.map((el) => {
      return {
        title: el,
      };
    });

    let list = {
      items: arr,
      created: Date.now(),
    };

    lists.update((n) => [...n, list]);
    plainList = "";
    togNew();
  }
</script>

<style lang="scss">
  .home {
    @media (max-width: 600px) {
      padding: 20px;
    }
  }

  h1 {
    margin-bottom: 20px;
  }

  textarea {
    width: 100%;
    height: 120px;
    margin-bottom: 10px;
    resize: none;
  }

  h2 {
    margin: 40px 0 20px 0;
  }
</style>

<div class="scroll">
  <div class="home col w100 p40 fcenter">
    <h1>Appriory</h1>

    {#if newHide}
      <button class="pri semi" on:click={togNew}>NUEVA LISTA</button>
    {:else}
      <textarea class="out semi p20" bind:value={plainList} />
      <button class="pri semi" on:click={makeList}>ENLISTAR</button>
    {/if}

    {#if lists_values.length}
      <h2>Listas</h2>

      <div class="row w100 jcenter">
        {#each lists_values as list}
          <List items={list.items} created={list.created} />
        {/each}
      </div>
    {/if}
  </div>
</div>
