<script>
  import { onMount } from "svelte";
  import { Router, Route, links } from "svelte-routing";
  import Home from "./routes/home/Home.svelte";
  import List from "./routes/list/List.svelte";
  import About from "./routes/about/About.svelte";
  import "verdu/fonts/circular.css";
  import "verdu/bundle.scss";

  export let url = "";
  let current = "/";

  onMount(() => {
    current = window.location.pathname;
  });
</script>

<style lang="scss">
  @import "./assets/vars";
  @import "./App";
  @import "./App.m";
</style>

<main class="col" use:links>
  <Router {url}>
    <nav class="row w100 p10 jcenter">
      <a href="/" class="btn semi" class:pri={current === '/'} on:click={() => (current = '/')}>Home</a>
      <a href="/about" class="btn semi" class:pri={current === '/about'} on:click={() => (current = '/about')}>About</a>
    </nav>
    <Route path="/" component={Home} />
    <Route path="list/:id" component={List} let:params />
    <Route path="about" component={About} />
  </Router>
</main>
