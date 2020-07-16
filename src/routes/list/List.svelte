<script>
  import { onMount } from "svelte";
  import { lists } from "../../stores.js";

  let params;
  let list_value = {
    items: [],
  };
  let unsubscribe;

  let arr;
  let modal = false;
  let title_message;
  let discardItem = {
    title: "",
    use: false,
  };

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

  let ind = 0;
  function startSorting() {
    modal = true;

    if (list_value.can_discard) {
      title_message = "Vamos a descartar algunos items de la lista (Si quieres)";
      isDiscard();
    } else {
      title_message = "¡A priorizar sea dicho!";
      monkeySort();
    }
  }

  function isDiscard() {
    setTimeout(() => (title_message = ""), 1500);

    arr = list_value.items;
    if (arr[ind]) {
      discardItem = arr[ind];
    } else {
      monkeySort();
    }
  }

  function monkeySort() {
    console.log(arr);
    list_value.can_discard = false;

    setTimeout(() => {
      title_message = "";

      setTimeout(() => {
        modal = false;
        list_value.can_discard = true;
      }, 1000);
    }, 1500);
  }

  function add() {
    discardItem["use"] = true;
    ind += 1;
    isDiscard();
  }

  function discard() {
    discardItem["use"] = false;
    ind += 1;
    isDiscard();
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
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .sort-btn {
    margin-top: 20px;
  }

  .no-match {
    font-size: 24px;
    text-align: center;
    margin-top: 30%;
  }

  .modal,
  .title {
    position: fixed;
    top: 0;
    left: 0;
    background: $bg;
    opacity: 0;
    pointer-events: none;
    transition: 500ms;

    .discard {
      h1 {
        text-align: center;
      }

      button {
        width: 40%;
        max-width: 200px;
      }
    }
  }

  .title {
    background: $pri;
    text-align: center;
    z-index: 2;
  }

  .active {
    opacity: 1;
    pointer-events: all;
  }
</style>

<div class="scroll">
  <div class="list col w100 p40 acenter">
    {#if list_value.items.length}
      <h1>{new Date(list_value.created).toDateString()}</h1>
      {#each list_value.items as item}
        <div class="card col w100 p20 acenter">
          <p>{item.title}</p>
        </div>
      {/each}

      <button class="sort-btn pri semi" on:click={startSorting}>EMPEZAR</button>
    {:else}
      <p class="no-match">No hay ningun item en esta lista o la lista no existe</p>
    {/if}

    <div class="modal col w100 h100 fcenter" class:active={modal}>
      <h2 class="title row w100 h100 fcenter p20" class:active={title_message}>{title_message}</h2>
      {#if list_value.can_discard}
        <div class="discard col w100 h100 fcenter p20">
          <h1>{discardItem.title}</h1>
          <div class="row w100 jcenter">
            <button class="succ semi m5" on:click={add}>Añadir</button>
            <button class="err semi m5" on:click={discard}>Descartar</button>
          </div>
        </div>
      {:else}
        <div class="discard col w100 h100 fcenter">
          <h1>🐵</h1>
        </div>
      {/if}
    </div>
  </div>
</div>
