<template>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Height</th>
      <th>Mass</th>
      <th>Hair color</th>
      <th>Favorites</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(person, index) in people" :key="index">
      <td>{{ person.name }}</td>
      <td>{{ person.height }}</td>
      <td>{{ person.mass }}</td>
      <td>{{ person.hair_color }}</td>
      <td>
        <button @click="changeFavoriteStatus(index)">{{ person.isFavorite ? "Delete" : "Add" }}</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {ref, onMounted, defineEmits} from "vue";
const emit = defineEmits(['changeFavorites']);

const people = ref([]);

const getData = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/people');
    if (!response.ok) {
      throw new Error('Ошибка получения данных с данного сервера');
    }

    const data = await response.json();
    people.value = data.results;
    people.value.forEach(item => item.isFavorite = false);
  } catch (error) {
    console.error(error);
  }
}

const changeFavoriteStatus = (index) => {
  people.value[index].isFavorite = !people.value[index].isFavorite;

  const person = {
    name: people.value[index].name,
    height: people.value[index].height,
    mass: people.value[index].mass,
    hair_color: people.value[index].hair_color,
    isFavorite: !people.value[index].isFavorite,
  };
  emit('changeFavorites', person);
}

onMounted(() => {
  if (localStorage.getItem('peopleList') !== null) {
    people.value = JSON.parse(localStorage.getItem('peopleList'));
  } else {
    getData();
  }
});
</script>

<style scoped>
table {
  margin: 20px auto auto;
  border: 2px solid black;
  border-radius: 3px;
  border-collapse: collapse;
}

th, td {
  text-align: center;
  padding: 12px 20px;
  border: 1px solid black;
}
</style>
