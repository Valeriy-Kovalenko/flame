<template>
  <div class="backdrop" v-if="searchResult.length !== 0 || searchQuery.length > 0" @click="resetSearch"></div>
  <div class="search">
    <img src="../assets/search.png"/>
    <input type="text" v-model.trim="searchQuery" @input="debouncedSearch" placeholder="Search hero">
    <ul class="result" v-if="searchResult.length !== 0">
      <li v-for="person in searchResult" :key="person.name" @click="showPerson(person)">
        name: {{ person.name }}
      </li>
    </ul>
    <div class="result not-found" v-if="showNotFound">No matches found</div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import type { Person } from "../../types";
import router from "../router";
import { debounce } from "lodash";

const props = defineProps({
  peopleList: Array as PropType<Person[]>,
});

const searchQuery = ref<string>("");
const searchResult = ref([]);
const showNotFound = ref<boolean>(false);

const search = async () => {
  showNotFound.value = false;
  try {
    const response = await fetch("https://swapi.dev/api/people/?search=" + searchQuery.value);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    if (searchQuery.value === "") {
      searchResult.value = [];
      return;
    }
    const data = await response.json();
    if (data.results.length === 0) {
      showNotFound.value = true;
    }
    searchResult.value = data.results;
  } catch (error) {
    console.error(error);
    alert("Произошла ошибка загрузки данных");
  }
};

const debouncedSearch = debounce(search, 300);

const resetSearch = () => {
  searchQuery.value = "";
  searchResult.value = [];
  showNotFound.value = false;
};

const showPerson = (person) => {
  const splitUrl = person.url.split("/");
  const personId = splitUrl[splitUrl.length - 2];
  router.push({ path: `/people/${personId}` });
};

</script>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
  height: 34px;
  max-width: 300px;
  border: 1px solid black;
  border-radius: 12px;
  z-index: 2;
  background-color: #fff;
}

.search img {
  height: 18px;
  margin: 0 4px 0 8px;
}

.search input {
  padding-left: 8px;
  height: 32px;
  width: 400px;
  border: none;
  border-radius: 14px;
}

.result {
  position: absolute;
  width: 100%;
  top: 20px;
  border: 1px solid lightgrey;
  border-radius: 12px;
  background-color: #fff;
  list-style: none;
  padding: 0;
  overflow: hidden;
}

.result li {
  cursor: pointer;
  border-bottom: 1px solid lightgrey;
  padding: 4px 8px;
}

.result li:hover {
  background-color: lightgrey;
}

.not-found {
  top: 36px;
  padding: 4px 8px;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.30);
  z-index: 2;
}
</style>
