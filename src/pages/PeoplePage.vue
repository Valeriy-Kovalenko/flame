<template>
  <div class="list">
    <PeopleButtons @changePeopleList="handleChangePeopleList"/>
    <PeopleTable
        :peopleList="props.peopleList"
        @changeFavoritesList="handleChangeFavoritesList"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from "vue";
import PeopleButtons from "../components/PeopleButtons.vue";
import PeopleTable from "../components/PeopleTable.vue";
import type { Person, ChangedPerson } from "../../types";

const emit = defineEmits(["changePeopleList", "changeFavoritesList"]);
const props = defineProps({
  peopleList: Array as PropType<Person[]>,
});

const handleChangePeopleList = (changedPerson: ChangedPerson) => {
  emit("changePeopleList", changedPerson);
};

const handleChangeFavoritesList = (selectedPersonName) => {
  emit("changeFavoritesList", selectedPersonName);
};
</script>

<style scoped>
.list {
  max-width: 600px;
  margin: 20px auto auto;
}
</style>
