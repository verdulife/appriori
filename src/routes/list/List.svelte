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
      title_message =
        "Vamos a descartar algunos items de la lista (Si quieres)";
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

  let sorteds = [];
  let pair_one;
  let pair_two;
  let one_ind = 0;
  let two_ind = 1;

  function monkeySort() {
    list_value.can_discard = false;
    arr = list_value.items;
    setTimeout(() => (title_message = ""), 1500);

    if (list_value.items.length === sorteds.length) {
      console.log(sorteds);
    } else {
      pair_one = arr[one_ind].title;
      pair_two = arr[two_ind].title;

      isSorted(pair_one, pair_two);
    }
  }

  function isSorted(one, two) {
    let is_one = sorteds.some((el) => el === one);
    let is_two = sorteds.some((el) => el === two);

    if (!is_one) one_ind += 1;
    if (!is_two) two_ind += 1;
  }

  function isBetter(item) {
    sorteds = [...sorteds, item];
    monkeySort();
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
    border-radius: 10px;
    overflow: hidden;

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
    color: $bg;
    text-align: center;
    z-index: 2;
  }

  .monkey-text {
    position: relative;
    background: $pri;
    font-size: 18px;
    padding: 10px 20px;
    border: 1px solid $border;
    border-radius: 10px;
    margin-bottom: 10px;
    z-index: 1;

    &:after {
      content: "";
      position: absolute;
      bottom: -7px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 14px;
      height: 14px;
      background: $pri;
      transform: rotate(45deg);
      border-right: 1px solid $border;
      border-bottom: 1px solid $border;
    }
  }

  h1 {
    z-index: 1;
  }

  .pair-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 10px;
    overflow: hidden;

    .col {
      transition: 200ms;

      &:hover {
        cursor: pointer;
        background: rgba($pri, 0.3);
        font-size: 24px;
        font-weight: bold;
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;

      .col {
        width: 100%;
        height: 50%;
      }
    }
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
      <p class="no-match">
        No hay ningun item en esta lista o la lista no existe
      </p>
    {/if}

    <div class="modal col w100 h100 fcenter" class:active={modal}>
      <h2 class="title row w100 h100 fcenter p20" class:active={title_message}>
        {title_message}
      </h2>
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
          <span class="monkey-text">¿Cual prefieres?</span>
          <h1>🐵</h1>
          <div class="pair-wrapper row w100 h100">
            <div class="col w50 h100 p20 fcenter" on:click={isBetter(pair_one)}>
              {pair_one}
            </div>
            <div class="col w50 h100 p20 fcenter" on:click={isBetter(pair_two)}>
              {pair_two}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
