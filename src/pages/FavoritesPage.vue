<template>
  <div class="favorites">
    <h1>Favorite characters list:</h1>
    <PeopleTable
        :peopleList="favoritesList"
        @changeFavoritesList="handleChangeFavoriteList"
    />
    <button @click="changePage('')">Home</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import PeopleTable from "../components/PeopleTable.vue";
import type { Person } from "../../types";
import router from "../router";

const emit = defineEmits(["changeFavoritesList"]);
const props = defineProps({
  peopleList: Array as PropType<Person[]>,
});

const favoritesList = computed((): Person[] => {
  return props.peopleList.filter(person => person.isFavorite === true);
});

const handleChangeFavoriteList = (selectedPersonName: string) => {
  emit("changeFavoritesList", selectedPersonName);
};

const changePage = (path: string) => {
  router.push("/" + path);
};
</script>

<style scoped>
.favorites {
  text-align: center;
}

button {
  margin-top: 16px;
}
</style>
