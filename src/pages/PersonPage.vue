<template>
  <PeopleTable
      :peopleList="props.peopleList"
      @changeFavoritesList="handleChangeFavoritesList"
  />
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from "vue";
import PeopleTable from "../components/PeopleTable.vue";
import type { Person } from "../../types";

const emit = defineEmits(["changeFavoritesList"]);
const props = defineProps({
  peopleList: Array as PropType<Person[]>,
});

const handleChangeFavoritesList = (selectedPersonName) => {
  emit("changeFavoritesList", selectedPersonName);
};
</script>

<style scoped>
</style>
