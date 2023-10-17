<template>
  <div class="list">
    <PeopleButtons @changePeopleList="handleChangePeopleList" />
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
          <button @click="changeFavoriteStatus(index)">{{ person.isFavorite ? "Delete" : "Add" }}</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, defineEmits} from "vue";
import PeopleButtons from "../components/PeopleButtons.vue";

const emit = defineEmits(['changeFavorites']);

const peopleList = ref([]);

const getPeopleList = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/people');
    if (!response.ok) {
      throw new Error('Ошибка получения данных с данного сервера');
    }

    const data = await response.json();
    peopleList.value = data.results;
    peopleList.value = peopleList.value.map((item) => ({ ...item, isFavorite: false }));

    localStorage.setItem('peopleList', JSON.stringify(peopleList.value));
  } catch (error) {
    console.error(error);
  }
};

const changeFavoriteStatus = (personIndex) => {
  peopleList.value[personIndex].isFavorite = !peopleList.value[personIndex].isFavorite;
  localStorage.setItem('peopleList', JSON.stringify(peopleList.value));

  const person = {
    name: peopleList.value[personIndex].name,
    height: peopleList.value[personIndex].height,
    mass: peopleList.value[personIndex].mass,
    hair_color: peopleList.value[personIndex].hair_color,
    isFavorite: !peopleList.value[personIndex].isFavorite,
  };
  emit('changeFavorites', person);
};

const handleChangePeopleList = (newPerson) => {
  if (typeof newPerson === 'string') {
    const personIndex = peopleList.value.findIndex(item => item.name === newPerson);
    peopleList.value.splice(personIndex, 1);

    localStorage.setItem('peopleList', JSON.stringify(peopleList.value));
  } else {
    peopleList.value.push(newPerson);
    localStorage.setItem('peopleList', JSON.stringify(peopleList.value));
  }
};

onMounted(() => {
  const storedData = localStorage.getItem('peopleList');
  if (storedData !== null) {
    peopleList.value = JSON.parse(storedData);
  } else {
    getPeopleList();
  }
});
</script>

<style scoped>
.list {
  max-width: 600px;
  margin: 20px auto auto;
}

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
