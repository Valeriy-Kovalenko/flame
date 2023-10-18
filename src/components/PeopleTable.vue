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
    <tr v-for="(person, index) in peopleList" :key="index">
      <td>{{ person.name }}</td>
      <td>{{ person.height }}</td>
      <td>{{ person.mass }}</td>
      <td>{{ person.hair_color }}</td>
      <td>
        <button @click="changeFavoriteStatus(person.name)">{{ person.isFavorite ? "Delete" : "Add" }}</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import type { Person } from "../../types";

const emit = defineEmits(["changeFavoritesList"]);
const props = defineProps({
  peopleList: Array as PropType<Person[]>,
});

const changeFavoriteStatus = (selectedPersonName: string) => {
  emit("changeFavoritesList", selectedPersonName);
};
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
