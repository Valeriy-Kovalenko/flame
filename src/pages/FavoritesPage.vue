<template>
  <h1>Favorites characters list:</h1>
  <PeopleTable
      :peopleList="favoritesList"
      @changeFavoritesList="handleChangeFavoriteList"
  />
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import PeopleTable from "../components/PeopleTable.vue";
import type { Person } from "../../types";

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
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
