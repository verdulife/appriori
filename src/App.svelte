<script>
  import { onMount } from "svelte";
  import { Router, Route, links } from "svelte-routing";
  import Home from "./routes/home/Home.svelte";
  import About from "./routes/about/About.svelte";
  import { log, dir } from "verdu/modules@dom";

  export let url = "";
  let current = "/";
</script>

<style lang="scss">
  :global() {
    @import "assets/scss/bundle.scss";
  }
  @import "assets/scss/scss@dom/vars.scss";

  nav {
    border-bottom: 1px solid $border;
  }
</style>

<main use:links>
  <Router {url}>
    <nav class="row w100 p10 jcenter">
      <a
        href="/"
        class="btn"
        class:black={current === '/'}
        on:click={() => (current = '/')}>
        Home
      </a>
      <a
        href="/about"
        class="btn"
        class:black={current === '/about'}
        on:click={() => (current = '/about')}>
        About
      </a>
    </nav>
    <Route path="/" component={Home} />
    <Route path="about" component={About} />
  </Router>
</main>
