<template>
  <main>
    <router-link to="/people">People</router-link>
    <router-link to="/favorites">Favorites</router-link>
  </main>
</template>

<script setup>
</script>

<style scoped>
main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
}
a {
  text-decoration: underline;
  color: black;
  font-size: 56px;
}
</style>
