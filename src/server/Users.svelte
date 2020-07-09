<script>
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/analytics";
  import { Config } from "./config";

  firebase.initializeApp(Config);
  firebase.analytics();

  const db = firebase.firestore();
  const usersRef = db.collection("users");

  let asyncUsers = getUsers();

  async function getUsers() {
    let snap = await db
      .collection("rtes")
      .where("paid", "==", true)
      .where("hide", "==", false)
      .get();

    return snap.docs;
  }
</script>

{#await asyncUsers}
  <p>Cargando...</p>
{:then snap}
  {#each snap as item}
    <p>{item.data().name}</p>
  {/each}
{:catch error}
  <p>{error}</p>
{/await}
