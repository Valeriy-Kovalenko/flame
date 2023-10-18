<template>
  <div class="action-bar">
    <div class="search">
      <img src="../assets/search.png"/>
      <input type="text" placeholder="Search">
    </div>
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
import {defineEmits, ref} from "vue";
import ButtonsModal from './ButtonsModal.vue';
import type {ChangedPerson} from "../../types";

const emit = defineEmits(['changePeopleList']);

const isModalVisible = ref<boolean>(false);
const isModalForAdd = ref<boolean>(false);
const isModalForDelete = ref<boolean>(false);

const showModal = (action): void => {
  isModalVisible.value = !isModalVisible.value;
  action === 'add' ? isModalForAdd.value = true : isModalForDelete.value = true;
};

const handleCloseAllModals = (): void => {
  isModalVisible.value = false;
  isModalForAdd.value = false;
  isModalForDelete.value = false;
};

const handleChangePeopleList = (changedPerson: ChangedPerson) => {
  emit('changePeopleList', changedPerson);
};
</script>

<style scoped>
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
  height: 34px;
  width: 300px;
  border: 1px solid lightgrey;
  border-radius: 12px;
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

.main-buttons button:first-child {
  margin-right: 4px;
}
</style>
