<script>
  export let items;
  export let created;
  export let discard;
</script>

<style lang="scss">
  @import "../../assets/vars";
  @import "./List";
  @import "./List.m";
</style>

<a class="list-wrapper col p20 m5" href="/list/{created}">
  <h3>{new Date(created).toDateString()}</h3>
  <p>
    {items.length} items en la lista ·
    <b>{discard ? 'Descartable' : 'Fija'}</b>
  </p>
</a>
