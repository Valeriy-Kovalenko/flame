<template>
  <div class="action-bar">
    <button @click="changePage('')">Home</button>
    <PeopleSearch/>
    <div class="main-buttons">
      <button @click="showModal('add')">Add Hero</button>
      <button @click="showModal('delete')">Delete Hero</button>
    </div>
    <ButtonsModal
        :isModalVisible="isModalVisible"
        :isModalForAdd="isModalForAdd"
        :isModalForDelete="isModalForDelete"
        @changePeopleList="handleChangePeopleList"
        @closeAllModals="handleCloseAllModals"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from "vue";
import ButtonsModal from "./PeopleModal.vue";
import type { ChangedPerson } from "../../types";
import PeopleSearch from "./PeopleSearch.vue";
import router from "../router";

const emit = defineEmits(["changePeopleList"]);

const isModalVisible = ref<boolean>(false);
const isModalForAdd = ref<boolean>(false);
const isModalForDelete = ref<boolean>(false);

const showModal = (action: string): void => {
  isModalVisible.value = !isModalVisible.value;
  action === "add" ? isModalForAdd.value = true : isModalForDelete.value = true;
};

const handleCloseAllModals = (): void => {
  isModalVisible.value = false;
  isModalForAdd.value = false;
  isModalForDelete.value = false;
};

const handleChangePeopleList = (changedPerson: ChangedPerson) => {
  emit("changePeopleList", changedPerson);
};

const changePage = (path: string) => {
  router.push("/" + path);
};
</script>

<style scoped>
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-buttons button:first-child {
  margin-right: 4px;
}
</style>
