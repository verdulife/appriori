<script>
  import { onMount } from "svelte";
  import { lists } from "../../stores.js";

  let params;
  let list_value = {
    items: [],
  };
  let unsubscribe;

  onMount(() => {
    params = window.location.pathname.split("/list/")[1];
    unsubscribe = lists.subscribe((value) => {
      value.forEach((item) => {
        if (item.created.toString() === params) {
          list_value = item;
        }
      });
    });
  });

  function unset(ev) {
    ev.currentTarget.parentNode.style.background = "#999";
  }

  function message() {
    alert("Aqui me he quedado Raed 🤣");
  }
</script>

<style lang="scss">
  @import "verdu/scss@dom/vars";

  .list {
    @media (max-width: 600px) {
      padding: 20px;
    }
  }

  h1 {
    margin-bottom: 20px;
  }

  .card {
    border: 1px solid $border;
    border-radius: 10px;
    margin-bottom: 5px;
    overflow: hidden;

    p {
      text-align: center;
      margin-bottom: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    button {
      padding: 5px 10px;
    }
  }

  .sort-btn {
    margin-top: 20px;
  }

  .no-match {
    font-size: 24px;
    text-align: center;
    margin-top: 50%;
    transform: translateY(-50%);
  }
</style>

<div class="scroll">
  <div class="list col w100 p40 acenter">
    {#if list_value.items.length}
      <h1>{new Date(list_value.created).toDateString()}</h1>
      {#each list_value.items as item}
        <div class="card col w100 p20 acenter">
          <p>{item}</p>
          <button class="outpri semi" on:click={unset}>NO INCLUIR</button>
        </div>
      {/each}

      <button class="sort-btn pri semi" on:click={message}>MOKEY SORT</button>
    {:else}
      <p class="no-match">No hay ningun item en esta lista o la lista no existe</p>
    {/if}
  </div>
</div>
