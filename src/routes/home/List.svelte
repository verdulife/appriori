<script>
  import { Link } from "svelte-routing";

  export let items;
  export let created;
</script>

<style lang="scss">
  @import "verdu/scss@dom/vars";

  .list-wrapper {
    width: 40%;
    border: 1px solid $border;
    border-radius: 10px;

    @media (max-width: 600px) {
      width: 100%;
    }

    h3,
    p {
      color: $base;
    }

    Link {
      width: 100%;
    }
  }
</style>

<a class="list-wrapper col p20 m5" href="/list/{created}">
  <h3>{new Date(created).toDateString()}</h3>
  <p>{items.length} items en la lista</p>
</a>
