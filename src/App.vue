<template>
  <router-view
      :favoritesList="favoritesList"
      @changeFavorites="handleChangeFavorites"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const favoritesList = ref([]);

const handleChangeFavorites = (newFavoritePerson) => {
  const isNewPersonFavorite = favoritesList.value.some(item => item.name === newFavoritePerson.name);

  if (isNewPersonFavorite) {
    const index = favoritesList.value.findIndex(item => item.name === newFavoritePerson.name);
    favoritesList.value.splice(index, 1);
  } else {
    favoritesList.value.push(newFavoritePerson);
  }

  console.log(favoritesList.value);
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
}

button {
  border-radius: 4px;
  padding: 2px 4px;
}

input:focus {
  outline: none;
}
</style>
