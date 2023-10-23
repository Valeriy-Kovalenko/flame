<template>
  <h1 v-if="!isPersonOnList">No information found for this character in our database. This may differ from your
    list.
  </h1>
  <template v-if="isPersonOnList">
    <h1>{{ currentPerson[0].name }}</h1>
    <PeopleTable
        v-if="currentPerson"
        :peopleList="currentPerson"
        @changeFavoritesList="handleChangeFavoritesList"
    />
  </template>
  <div class="active-bar">
    <button @click="changePage('')">Back to Home</button>
    <button @click="changePage('people')">Back to List</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, PropType } from "vue";
import PeopleTable from "../components/PeopleTable.vue";
import type { Person } from "../../types";
import { useRoute } from "vue-router";
import router from "../router";

const emit = defineEmits(["changeFavoritesList"]);
const props = defineProps({
  peopleList: Array as PropType<Person[]>,
});

const currentPersonId = useRoute().params.id;

const currentPerson = [props.peopleList.find((person) => {
  const personSplitUrl = person.url.split("/");
  const personId = personSplitUrl[personSplitUrl.length - 2];
  return personId === currentPersonId;
})];

const isPersonOnList = computed(() => {
  return currentPerson[0] !== undefined;
});

const handleChangeFavoritesList = (selectedPersonName) => {
  emit("changeFavoritesList", selectedPersonName);
};

const changePage = (path: string) => {
  router.push("/" + path);
};
</script>

<style scoped>
h1 {
  margin: 20px auto auto;
  text-align: center;
  max-width: 600px;
}

.active-bar {
  margin: 20px auto auto;
  width: fit-content;
}

button {
  margin-right: 4px;
  padding: 4px 8px;
}
</style>
