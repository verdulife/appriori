<script>
  import { onMount } from "svelte";
  import { lists } from "../../stores.js";
  import { ComparisonMatrix, quickSort } from "./monkeysort.js";

  let params;
  let list_value = {
    items: [],
  };
  let unsubscribe;
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

  let arr;
  let matrix;
  let pair_one;
  let pair_two;

  function unset(ev) {
    ev.currentTarget.parentNode.style.background = "#999";
  }

  let ind = 0;
  function startSorting() {
    modal = true;
    arr = list_value.items;

    if (list_value.can_discard) {
      title_message = "Vamos a descartar algunos items de la lista";
      isDiscard();
    } else {
      title_message = "¡A priorizar sea dicho!";
      monkeySort();
    }
  }
  function isDiscard() {
    setTimeout(() => (title_message = ""), 1500);

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

  function monkeySort() {
    setTimeout(() => (title_message = ""), 1500);
    matrix = new ComparisonMatrix(arr);
    tryQuickSort();
  }

  function tryQuickSort() {
    try {
      quickSort(arr, matrix);
      showResults();
    } catch (e) {
      console.log(arr[0]);
      askUser(arr[0].title, arr[1].title);
    }
  }

  function askUser(a, b) {
    pair_one = a;
    pair_two = b;
  }

  /* function askAnswer(e) {
    e.preventDefault();
    var a = $("#ask_a").prop("text");
    var b = $("#ask_b").prop("text");
    var result = $(this).data("result");
    matrix.set(a, b, result);
    tryQuickSort();
  } */

  /* function showResults() {
    $("#input").hide();
    $("#ask").hide();
    $("#results").show();
    $("#results_list").html("");
    $("#explicit_count").text(matrix.explicitCount);
    _(items).each(function (item) {
      $("<li />").appendTo($("#results_list")).text(item);
    });
  }
 */
</script>

<style lang="scss">
  @import "../../assets/vars";
  @import "./List";
  @import "./List.m";
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
          <span class="monkey-text">¿Cual prefieres?</span>
          <h1>🐵</h1>
          <div class="pair-wrapper row w100 h100">
            <div class="col w50 h100 p20 fcenter" on:click={askUser(pair_one)}>{pair_one}</div>
            <div class="col w50 h100 p20 fcenter" on:click={askUser(pair_two)}>{pair_two}</div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
