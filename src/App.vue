<template>
  <router-view
      :peopleList="peopleList"
      @changePeopleList="handleChangePeopleList"
      @changeFavoritesList="handleChangeFavoritesList"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { ChangedPerson, Person } from "../types";

const peopleList = ref<Person[]>([]);
const getPeopleList = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/people");
    if (!response.ok) {
      throw new Error("Ошибка получения данных с данного сервера");
    }

    const data = await response.json();
    peopleList.value = data.results;
    peopleList.value = peopleList.value.map((item) => ({...item, isFavorite: false}));

    localStorage.setItem("peopleList", JSON.stringify(peopleList.value));
  } catch (error) {
    console.error(error);
  }
};

const handleChangePeopleList = (changedPerson: ChangedPerson) => {
  if (typeof changedPerson === "string") {
    peopleList.value = peopleList.value.filter(item => item.name !== changedPerson);
    localStorage.setItem("peopleList", JSON.stringify(peopleList.value));
  } else {
    peopleList.value.push(changedPerson);
    localStorage.setItem("peopleList", JSON.stringify(peopleList.value));
  }
};

const handleChangeFavoritesList = (selectedPersonName) => {
  const selectedPersonIndex = peopleList.value.findIndex(person => person.name === selectedPersonName);
  peopleList.value[selectedPersonIndex].isFavorite = !peopleList.value[selectedPersonIndex].isFavorite;

  localStorage.setItem("peopleList", JSON.stringify(peopleList.value));
};

onMounted(() => {
  const storedData = localStorage.getItem("peopleList");

  if (storedData !== null) {
    peopleList.value = JSON.parse(storedData);
  } else {
    getPeopleList();
  }
});
</script>

<style>
* {
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
